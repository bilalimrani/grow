<template>
    <div>
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                    <div class="login100-form validate-form">
                        <span class="login100-form-title p-b-55">
                            Forgot Password
                        </span>
                        <span v-show="showMessage" style="color:#2b4bae;font-weight:bold;">Please check your mailbox.</span>
                        <span v-show="errorMessage.hasError" style="color:#ff0000;font-weight:bold;">{{errorMessage.message}}</span>
                       <form class="login100-form validate-form" @submit.prevent="signup">
                        <div class="wrap-input100 validate-input m-b-16">
                            <input class="input100" v-validate="'required|email'" data-vv-delay="1000" type="text" name="emailReset" v-model="email" placeholder="Email">
                             <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <span class="lnr lnr-envelope"></span>
                            </span>
                            <span v-show="errors.has('emailReset')" class="text-danger">{{ errors.first('emailReset') }}</span>
                        </div>

                        <div class="container-login100-form-btn p-t-25">
                            <button class="login100-form-btn" type="submit">
                              Reset Password
                            </button>
                        </div>
                       </form>

                        <div class="text-center w-full p-t-115">
                            <a class="txt1 bo1 hov1" href="#">
                              <router-link to="/login">
                                Sign In
                              </router-link>							
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import httpClient from '../../services/http-client';
export default {
  data: function () {
    return {
      showMessage: false,
      errorMessage: {hasError: false, message: ''}
    }
  },
  methods: {
    signup () {
      this.showMessage = false;
      this.errorMessage = {hasError: false, message: ''};
      this.$validator.validateAll().then(isValid => {
        // don't make a request to server if form is not valid
        if (!isValid) {
          return
        }
        httpClient
          .put('forgot_password', { 'email': this.email })
          .then(
            res => {
              this.showMessage = true
            },
            err => {
              console.log(err.response);
              if (err.response.data.code === 'UNPROCESSABLE_ENTITY') {
                this.errorMessage.hasError = true;
                this.errorMessage.message = err.response.data.errors[0];
              }
            }
          )
      })
    }
  }
}
</script>
<style scoped>
/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

@import url("https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800");

/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
}

body,
html {
  height: 100%;
  font-family: Poppins-Regular, sans-serif;
}

.text-danger {
  color: red;
}

/*---------------------------------------------*/
a {
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #ff2557;
}

/*---------------------------------------------*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}
input:focus:-moz-placeholder {
  color: transparent;
}
input:focus::-moz-placeholder {
  color: transparent;
}
input:focus:-ms-input-placeholder {
  color: transparent;
}

textarea:focus::-webkit-input-placeholder {
  color: transparent;
}
textarea:focus:-moz-placeholder {
  color: transparent;
}
textarea:focus::-moz-placeholder {
  color: transparent;
}
textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-webkit-input-placeholder {
  color: #acacac;
}
input:-moz-placeholder {
  color: #acacac;
}
input::-moz-placeholder {
  color: #acacac;
}
input:-ms-input-placeholder {
  color: #acacac;
}

textarea::-webkit-input-placeholder {
  color: #acacac;
}
textarea:-moz-placeholder {
  color: #acacac;
}
textarea::-moz-placeholder {
  color: #acacac;
}
textarea:-ms-input-placeholder {
  color: #acacac;
}

/*---------------------------------------------*/
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-size: 16px;
  color: #999999;
  line-height: 1.4;
}

.bo1 {
  border-bottom: 1px solid #999999;
}

.hov1:hover {
  border-color: #ff2557;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;
}
.container-login100::after {
  background: #ff2557; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #ff2557 0%,
    #ffffff 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #ff2557 0%,
    #ffffff 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #ff2557 0%,
    #ffffff 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr="#ff2557",
      endColorstr="#ffffff",
      GradientType=0
    ); /* IE6-9 */
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.container-login100::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("../../assets/img-01.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 2;
}

.wrap-login100 {
  width: 450px;
  background: #fff;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  z-index: 2;
  padding: 25px 49px;
}

.btn-google:hover {
  background: none;
}

/*------------------------------------------------------------------
[  ]*/
.login100-form {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.login100-form-title {
  font-size: 30px;
  color: #333333;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
  font-weight: 800;

  width: 100%;
  display: block;
  margin: 20px 0 30px;
}
.contact100-form-checkbox {
  margin: 20px 0;
}
.wrap-input100.validate-input.m-b-16 {
  margin-bottom: 16px;
}

/*---------------------------------------------*/
.wrap-input100 {
  position: relative;
  width: 100%;
  z-index: 1;
}

.input100 {
  font-size: 18px;
  line-height: 1.2;
  color: #686868;
  display: block;
  width: 100%;
  background: #efefef;
  height: 60px;
  border-radius: 60px;
   -webkit-border-radius: 60px;
  -moz-border-radius: 60px;
  -ms-border-radius: 60px;
  padding: 0 30px 0 65px;
  
}
span.text-danger {
    position: absolute;
    top: -25px;
    left: 22px;
}
.text-center.w-full {
  width: 100%;
  padding: 40px 0 17px;
}

/*------------------------------------------------------------------
[ Focus ]*/
.focus-input100 {
  display: block;
  position: absolute;
  border-radius: 3px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  -moz-border-radius: 60px; /* Firefox */  
 -webkit-border-radius: 60px; /* Safari, Chrome */  
 border-radius: 60px; /* CSS3 */
  color:#ff2557;
}

.input100:focus + .focus-input100 {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}

@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 60px 20px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 60px 20px;
    opacity: 0;
  }
}

.symbol-input100 {
  font-size: 24px;
  color: #999999;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 23px;
  padding-bottom: 5px;
  pointer-events: none;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus + .focus-input100 + .symbol-input100 {
  color: #ff2557 !important;
  padding-left: 18px;
}

/*==================================================================
[ Restyle Checkbox ]*/

.input-checkbox100 {
  display: none;
}

.label-checkbox100 {
  font-size: 16px;
  color: #999999;
  line-height: 1.2;

  display: block;
  position: relative;
  padding-left: 26px;
  cursor: pointer;
  font-weight: normal;
}

.label-checkbox100::before {
  content: "\f00c";
  font-family: FontAwesome;
  font-size: 13px;
  color: transparent;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background: #fff;
  border: 2px solid #ff2557;
  left: 0;
  top: 48%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}

.input-checkbox100:checked + .label-checkbox100::before {
  color: #ff2557;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login100-form-btn {
  font-size: 16px;
  line-height: 1.5;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  height: 62px;
  -moz-border-radius: 60px; /* Firefox */  
 -webkit-border-radius: 60px; /* Safari, Chrome */  
 border-radius: 60px; /* CSS3 */
  background: #ff2557;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background: rgba(255,0,68,0.75);
}

/*------------------------------------------------------------------
[ Button sign in with ]*/
.btn-face,
.btn-google {
  font-size: 16px;
  line-height: 1.2;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc((100% - 10px) / 2);
  height: 40px;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.btn-face {
  color: #3b5998;
}

.btn-face i {
  font-size: 20px;
  margin-right: 10px;
  padding-bottom: 1px;
}

.btn-google {
  color: #555555;
}

.btn-google img {
  width: 19px;
  margin-right: 10px;
  padding-bottom: 1px;
}

.btn-face:hover,
.btn-google:hover {
  border-color: #ff2557;
}

/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: white;
  border: 1px solid #c80000;
  border-radius: 3px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
  pointer-events: none;

  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f12a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 13px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

/*//////////////////////////////////////////////////////////////////
[ responsive ]*/

@media (max-width: 480px) {
  .wrap-login100 {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>

