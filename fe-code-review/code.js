app.post('/api/extract', upload.single('file'), async (req, res) => {
    // api url could be extracted to separate CONST
    logInfo('POST /api/extract',req.body);
    logInfo('FILE=',req.file);

    if (req.body) {
        //we could use early return pattern
        const file = req.file;
        // desctructuring couldbe useful for req properties
        const requestID = req.body.requestID;
        const project = req.body.project;
        const idUser = req.body.userID;
        const user = await User.findOne(idUser);

        if (requestID && project && idUser && user) {
            //early return pattern
            //we could extract those conditions to single function - but I leave it to your opinion
            logDebug('User with role '+user.role, user);
            if (user.role === 'ADVISOR' || user.role.indexOf('ADVISOR') > -1)
                //user role advisor should be separate const; instead of indexof we could use includes
                // if is missing braces
                return res.json({requestID, step: 999, status: 'DONE', message: 'Nothing to do for ADVISOR role'});
                //magic strings could be exctracted to const
            /* reset status variables */
            await db.updateStatus(requestID, 1, '');

            logDebug('CONFIG:', config.projects);
            if (project === 'inkasso' && config.projects.hasOwnProperty(project) && file) {
                //inkasso should be extracted to consts,
                const hashSum = crypto.createHash('sha256');
                const fileHash = idUser;
                const fileName = 'fullmakt';
                // magic string to  const ?
                const fileType = mime.getExtension(file.mimetype);
                if (fileType !== 'pdf')
                    // magic string to const? no braces after if statement
                    return res.status(500).json({requestID, message: 'Missing pdf file'});
                //message could be separated to const
                await db.updateStatus(requestID, 3, '');

                const folder = `${project}-signed/${idUser}`;
                logDebug('FILE2=', file);
                await uploadToGCSExact(folder, fileHash, fileName, fileType, file.mimetype, file.buffer);
                await db.updateStatus(requestID, 4, '');
                const ret = await db.updateUploadedDocs(idUser, requestID, fileName, fileType, file.buffer);
                logDebug('DB UPLOAD:', ret);

                await db.updateStatus(requestID, 5, '');

                let sent = true;
                //unused variable
                const debtCollectors = await db.getDebtCollectors();
                logDebug('debtCollectors=', debtCollectors);
                if (!debtCollectors)
                    return res.status(500).json({requestID, message: 'Failed to get debt collectors'});
                //message to const? no braces after if statement

                if (!!(await db.hasUserRequestKey(idUser))) { //FIX: check age, not only if there's a request or not
                    return res.json({requestID, step: 999, status: 'DONE', message: 'Emails already sent'});
                    //to const?
                }

                const sentStatus = {};
                for (let i = 0; i < debtCollectors.length ; i++) {
                    //forEeach instead of for
                    await db.updateStatus(requestID, 10+i, '');
                    const idCollector = debtCollectors[i].id;
                    const collectorName = debtCollectors[i].name;
                    const collectorEmail = debtCollectors[i].email;
                    //we could use desctructuring with rename here
                    const hashSum = crypto.createHash('sha256');
                    const hashInput = `${idUser}-${idCollector}-${(new Date()).toISOString()}`;
                    logDebug('hashInput=', hashInput);
                    hashSum.update(hashInput);
                    const requestKey = hashSum.digest('hex');
                    logDebug('REQUEST KEY:', requestKey);

                    const hash = Buffer.from(`${idUser}__${idCollector}`, 'utf8').toString('base64')

                    if (!!(await db.setUserRequestKey(requestKey, idUser))
                        && !!(await db.setUserCollectorRequestKey(requestKey, idUser, idCollector))) {

                        /* prepare email */
                        //84 - 108 returning response should be separate function
                        const sendConfig = {
                            sender: config.projects[project].email.sender,
                            replyTo: config.projects[project].email.replyTo,
                            subject: 'Email subject,
                            //unclosed string?
                            templateId: config.projects[project].email.template.collector,
                            params: {
                                downloadUrl: `https://url.go/download?requestKey=${requestKey}&hash=${hash}`,
                                uploadUrl: `https://url.go/upload?requestKey=${requestKey}&hash=${hash}`,
                                confirmUrl: `https://url.go/confirm?requestKey=${requestKey}&hash=${hash}`
                            },
                            tags: ['request'],
                            to: [{ email: collectorEmail , name: collectorName }],
                        };
                        logDebug('Send config:', sendConfig);

                        try {
                            await db.setEmailLog({collectorEmail, idCollector, idUser, requestKey})
                        } catch (e) {
                            logDebug('extract() setEmailLog error=', e);
                        }

                        /* send email */
                        const resp = await email.send(sendConfig, config.projects[project].email.apiKey);
                        //should be separate function to  here
                        logDebug('extract() resp=', resp);

                        // update DB with result
                        await db.setUserCollectorRequestKeyRes(requestKey, idUser, idCollector, resp);

                        if (!sentStatus[collectorName])
                            //no braces {}
                            sentStatus[collectorName] = {};
                        sentStatus[collectorName][collectorEmail] = resp;

                        if (!resp) {
                            logError('extract() Sending email failed: ', resp);
                            //should we consider updating status in database?
                        }
                    }
                }
                await db.updateStatus(requestID, 100, '');

                logDebug('FINAL SENT STATUS:');
                console.dir(sentStatus, {depth: null});

                //if (!allSent)
                //return res.status(500).json({requestID, message: 'Failed sending email'});

                //commented code should be deleted

                await db.updateStatus(requestID, 500, '');

                /* prepare summary email */
                const summaryConfig = {
                    //bcc: [{ email: 'tomas@inkassoregisteret.com', name: 'Tomas' }],
                    //commented code should be deleted

                    sender: config.projects[project].email.sender,
                    replyTo: config.projects[project].email.replyTo,
                    subject: 'Oppsummering Kravsforespørsel',
                    templateId: config.projects[project].email.template.summary,
                    params: {
                        collectors: sentStatus,
                    },
                    tags: ['summary'],
                    to: [{ email: 'tomas@upscore.no' , name: 'Tomas' }], // FIXXX: config.projects[project].email.sender
                };
                logDebug('Summary config:', summaryConfig);

                /* send email */
                //const respSummary = await email.send(sendConfig, config.projects[project].email.apiKey);
                //logDebug('extract() summary resp=', respSummary);

                //commented code should be deleted

                await db.updateStatus(requestID, 900, '');
            }
            await db.updateStatus(requestID, 999, '');
            return res.json({requestID, step: 999, status: 'DONE', message: 'Done sending emails...'});
        } else
            return res.status(500).json({requestID, message: 'Missing requried input (requestID, project, file)'});
    }
    res.status(500).json({requestID: '', message: 'Missing requried input (form data)'});
});