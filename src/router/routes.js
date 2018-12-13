import Dashboard from '../components/Dashboard.vue'
import Admin from '../components/Admin.vue'
import NotFound from '../components/modules/dashboard/404.vue'
import UserStats from '../components/modules/common-page/userStats.vue'
import TargetAudience from '../components/modules/common-page/targetAudience.vue'
import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
import LoginPop from '../components/auth/Login_pop.vue'
import ForgotPassword from '../components/auth/ForgotPassword.vue'
import ResetPassword from '../components/auth/ResetPassword.vue'
import NotFoundSecond from '../components/modules/dashboard/500.vue'
import ActivitySettings from '../components/modules/settings/ActivitySettings';
import Payments from '../components/modules/payment/Payments';
import AdminStats from '../components/modules/admin-dashboard/AdminStats';
import UserList from '../components/modules/admin-dashboard/user/UserList';
import UserEdit from '../components/modules/admin-dashboard/user/UserEdit';
import ProxyList from '../components/modules/admin-dashboard/proxy/ProxyList';
import NewProxy from '../components/modules/admin-dashboard/proxy/NewProxy';
import EditProxy from '../components/modules/admin-dashboard/proxy/EditProxy';
import AdminSettings from '../components/modules/admin-dashboard/settings';
import Plans from '../components/modules/plans/Plans';
import Config from '../config';

const roles = Config.roles;

// Routes
const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot_password',
    name: 'forgot_password',
    component: ForgotPassword,
    meta: { requiresAuth: false },
  },
  {
    path: '/reset_password',
    name: 'reset_password',
    component: ResetPassword,
    meta: { requiresAuth: false },
  },
  // {
  //   path: '/plans',
  //   name: 'plans',
  //   component: Plans,
  // },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true, permission: 'dashboard_admin', roles: [roles.admin] },
    beforeEnter: (to, from, next) => {
      document.body.className += 'skin-light sidebar-mini'
      next()
    },
    children: [
      {
        path: '',
        name: 'admim-stats',
        component: AdminStats,
        meta: { requiresAuth: true, permission: 'admin_stats', roles: [roles.admin] },
      },
      {
        path: '/users',
        name: 'users',
        component: UserList,
        meta: { requiresAuth: true, permission: 'user_list', roles: [roles.admin] },
      },
      {
        path: '/user/:id',
        name: 'user-edit',
        component: UserEdit,
        meta: { requiresAuth: true, permission: 'user_edit', roles: [roles.admin] },
      },
      {
        path: '/proxies',
        name: 'proxies',
        component: ProxyList,
        meta: { requiresAuth: true, permission: 'proxy_list', roles: [roles.admin] },
      },
      {
        path: '/proxy/new',
        name: 'new-proxy',
        component: NewProxy,
        meta: { requiresAuth: true, permission: 'new_proxy', roles: [roles.admin] },
      },
      {
        path: '/proxy/:id',
        name: 'edit-proxy',
        component: EditProxy,
        meta: { requiresAuth: true, permission: 'edit_proxy', roles: [roles.admin] },
      },
      {
        path: '/settings',
        name: 'admin-settings',
        component: AdminSettings,
        meta: { requiresAuth: true, permission: 'admin_settings', roles: [roles.admin] },
      }
    ]
  },
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true, permission: 'dashboard', roles: [roles.user] },
    beforeEnter: (to, from, next) => {
      document.body.className += 'skin-light sidebar-mini'
      next()
    },
    activate: function () {
      this.$nextTick(function () {
        // => 'DOM loaded and ready'
        // alert('test')
      })
    },
    children: [
      {
        path: '',
        name: 'user-stats',
        component: UserStats,
        meta: { requiresAuth: true, permission: 'user_stats', roles: [roles.user] },
      }, {
        path: '/target-audience',
        name: 'target-audience',
        component: TargetAudience,
        meta: { requiresAuth: true, permission: 'target_audience', roles: [roles.user] },
      }, {
        path: '/activity-settings',
        name: 'activity-settings',
        component: ActivitySettings,
        meta: { requiresAuth: true, permission: 'activity_settings', roles: [roles.user] },
      },
      {
        path: '/payments',
        name: 'payments',
        component: Payments,
        meta: { requiresAuth: true, permission: 'payments', roles: [roles.user] },
      },
      {
        path: '/plans',
        name: 'plans',
        component: Plans,
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  }, {
    path: '/500',
    name: '500',
    component: NotFoundSecond
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export default routes
