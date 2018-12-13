import VueRouter from 'vue-router'
import routes from './routes'
import User from '../services/user';
import Config from '../config';
import authService from '../services/auth.service';
// Routing logic
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const roles = (to.meta && to.meta['roles']) ? to.meta['roles'] : '';
  const isUserLoggedIn = authService.isUserLoggedIn()
  if(to.meta.requiresAuth === false && isUserLoggedIn) {
    console.log('user is logged in and not allowed to visit this page')
    next('/');
    return
  }

  if (roles) {
    if (!User.user) {
      User.getInfo().then(res => {
        // User.user = res.data.data;
        // User.user.subscription = Config.subscriptions.trial;
        // hasSubscription(User.user, next);
        // User.user.roles = [{name: 'Admin'}];
        return hasSubscription(User.user, next)
      }).then(() => {
        if (User.user.insta_accounts.length) {
          getBio(roles, next);
        } else {
          // if user is not admin only then check for permissions
          const isAdmin = User.user.roles.find(role => role.name === Config.roles.admin);
          if(!isAdmin) {
            hasPermission(User.user, roles, next);
          }else {
            next('/admin')
          }
        }
      })
    } else {
      if(!hasSubscription(User.user, next)) {
        next(false)
      }  else if (User.user.insta_accounts.length && !User.instaAccount) {
        getBio(roles, next);
      } else {
        hasPermission(User.user, roles, next);
      }
    }
  } else {
    next();
  }
});


const getBio = (roles, next) => {
  User.getBio().then((res) => {
    User.instaAccount = res.data.data;
    hasPermission(User.user, roles, next);
  }, (err) => {
    next();
  });
};

const hasSubscription = (user, next) => {

  const isAdmin = User.user.roles.find(role => role.name === Config.roles.admin);
  if(isAdmin) {
    console.log('user is admin')
    return true
  }

  if(!user.subscription) {
    console.log('user does not have subscription')
    next('/plans');
    return false
  }
  // user has subscription but it is not active
  // if(user.subscription && user.subscription.status.toUpperCase() !== 'ACTIVE') {
  //   console.log('user has INACTIVE subscription')
  //   next('/plans')
  //   return false
  // }

  return true
}

// Check and navigate based on roles
const hasPermission = (user, roles, next) => {
  const hasRole = user.roles.filter(role => roles.indexOf(role.name) > -1);
  if (hasRole.length) {
    next();
  } else {
    next('/404');
  }
};

export default router