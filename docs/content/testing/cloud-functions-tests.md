---
title: Cloud Functions
slug: testing/cloud-functions
type: page
language: en
tags:
  - testing
---

Tests for Cloud functions are written using Mocha/Chai. They live in the Horchata Repo.

## Running Locally

Unit tests are run through mocha when calling:
  
  ```bash
  npm run test --prefix functions
  ```

**Note:** Coverage is genearted when running:

  ```bash
  npm run test:cov --prefix functions
  ```

## Writing
How you write your tests for cloud functions depends on the scope you would like to cover in your test.
[the vanilla js testing section](/images/FiradminLogo.png)
### Logic
As mentioned in [the vanilla js testing section](/testing/vanilla-js), we can tests simple logic directly with mocha/chai. There are [already functions with unit tests in Horchata](https://github.com/fireadmin/horchata/blob/master/functions/test/unit/sheetsSync.spec.js).

### Full Cloud Function
Testing is slightly different between [HTTP functions](https://firebase.google.com/docs/functions/unit-testing#testing_http_functions) and [other function types](https://firebase.google.com/docs/functions/unit-testing#testing_background_non-http_functions)

Everything in tests can be mocked including Database updates and external API calls

* [PubSub Function Test Example](https://github.com/prescottprue/fireadmin/blob/master/functions/test/unit/sendFcm.spec.js)
* [RTDB Function Test Example](https://github.com/prescottprue/fireadmin/blob/master/functions/test/unit/callGoogleApi.spec.js) (has external API calls which use HTTP mocked with [`fauxJax`][faux-jax-url])
* [HTTP Function Test Example](https://github.com/prescottprue/fireadmin/blob/master/functions/test/unit/version.spec.js)

## Other Resources

* [Unit testing of Cloud Functions  |  Firebase](https://firebase.google.com/docs/functions/unit-testing)
* [faux-jax][faux-jax-url] for mocking http

[faux-jax-url]: https://github.com/algolia/faux-jax