/**
 * Created by pradeep on 12/5/17.
 */
import React from 'react'
import Aboutpage from '../templates/about'
const Contentstack = require('contentstack')
var env_config = process.env.ENV || 'development';
const config = require('../config/'+env_config);
let Stack = Contentstack.Stack({
  api_key: config.contentstack.api_key,
  access_token: config.contentstack.access_token,
  environment: config.contentstack.environment
});
export default class About extends React.Component {
    static async getInitialProps () {
        const data = new Promise(resolve => {
            var  Query = Stack.ContentType("about").Query()
                .includeReference('reference_header','reference_footer')
                .toJSON()
                .find()
                .then(function success(result) {
                    resolve(result);
                }, function error(error) {

                });
        })
        return data;
    }
    render () {
        const page = this.props[0];
        return <Aboutpage page={page}/>
    }
}