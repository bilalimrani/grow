export default {
    errorEvents: {
        badRequest: 'BAD_REQUEST',
        serverError: 'SERVER_ERROR'
    },
    plans: {
        free: {
            id: 1, 
            features: [
              { icon: "fa fa-check success", description: "Real Instagram Growth" },
              { icon: "fa fa-times danger", description: "Up to <strong>50x Faster</strong> Speed" },
              { icon: "fa fa-check success", description: "Advanced Targeting" },
              { icon: "fa fa-check success", description: "Full Filters Access" },
              { icon: "fa fa-lock success", description: "Safe and Secure" },
              { icon: "fa fa-check success", description: "Growth Report" },
            ],
            growth: "20",
            description: "Start your 3 days free trial before you pay."
          },
          monthly: {
            id: 2,
            features: [
              { icon: "fa fa-check success", description: "<strong>Unlimited</strong> Activities" },
              { icon: "fa fa-check success", description: "Up to <strong>50x Faster</strong> Speed" },
              { icon: "fa fa-check success", description: "<strong>Advanced</strong> Targeting" },
              { icon: "fa fa-check success", description: "<strong>Full Filters</strong> Access" },
              { icon: "fa fa-check success", description: "<strong>Growth</strong> Report" },
              { icon: "fa fa-lock success", description: "<strong>Safe</strong> and Secure" },
            ],
            growth: '100',
            description: "We work at max time to get you <strong class='p-color'>better, faster growth</strong>."
          },
          weekly: {
            id: 3,
            features: [
              { icon: "fa fa-check success", description: "<strong>Unlimited</strong> Activities" },
              { icon: "fa fa-check success", description: "Up to <strong>50x Faster</strong> Speed" },
              { icon: "fa fa-check success", description: "<strong>Advanced</strong> Targeting" },
              { icon: "fa fa-check success", description: "<strong>Full Filters</strong> Access" },
              { icon: "fa fa-check success", description: "<strong>Growth</strong> Report" },
              { icon: "fa fa-lock success", description: "<strong>Safe</strong> and Secure" },
            ],
            growth: '100',
            description: "We work at max time to get you <strong class='p-color'>better, faster growth</strong>."
          },
    },
    instaConfig: {
      accountsPerProxy: 'accounts_per_proxy'
    },
    subscriptionStatus: {
      ACTIVE: 'ACTIVE'
    },
    payment: {
      image: '/static/img/logo.png'
    },
    planType: {
      free: 'FREE',
      paid: 'PAID'
    }
}