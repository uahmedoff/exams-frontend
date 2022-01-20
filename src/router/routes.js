const routes = [
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/layouts/Auth.vue'),
      children:[
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/Login.vue'),
        }
      ]
    },
    {
      path: "/admin-dashboard",
      name: "AdminDashboardMain",
      component: () => import("@/layouts/Main.vue"),
      meta: {
        requiresAuth: true,
      },      
      children: [
        {
          path: "",
          name: "AdminDashboard",
          component: () =>
            import("@/views/admin/Dashboard.vue"),
        },
        {
            path: "level/:level_id/type/:question_type/resource",
            name: "Resource",
            component: () =>
              import("@/views/admin/resource/Main.vue"),
            children: [
                {
                    path: 'add',
                    name: 'AddResource',
                    component: () => import("@/views/admin/resource/New.vue"),
                },
                {
                    path: ':resource_id/edit',
                    name: 'EditResource',
                    component: () => import("@/views/admin/resource/Edit.vue"),
                }
            ]
          },
          {
            path: "level/:level_id/type/:question_type/question/:question_id/answer",
            name: "Answer",
            component: () =>
              import("@/views/admin/answer/Main.vue"),
            children: [
                {
                    path: 'add',
                    name: 'AddAnswer',
                    component: () => import("@/views/admin/answer/New.vue"),
                },
                {
                    path: ':question_id/edit',
                    name: 'EditAnswer',
                    component: () => import("@/views/admin/answer/Edit.vue"),
                }
            ]
          },
          {
            path: "level/:level_id/type/:question_type/question",
            name: "Question",
            component: () =>
              import("@/views/admin/question/Main.vue"),
            children: [
                {
                    path: 'add',
                    name: 'AddQuestion',
                    component: () => import("@/views/admin/question/New.vue"),
                },
                {
                    path: ':question_id/edit',
                    name: 'EditQuestion',
                    component: () => import("@/views/admin/question/Edit.vue"),
                }
            ]
          },
          {
            path: "level/:level_id/type/:question_type",
            name: "ResourceAndQuestionsByLevelAndType",
            component: () =>
              import("@/views/admin/ResourceAndQuestions.vue"),
            children: [
              {
                  path: 'resource',
                  name: 'Resource',
                  component: () => import("@/views/admin/resource/Main.vue"),
                  children: [
                      {
                          path: 'add',
                          name: 'AddResource',
                          component: () => import("@/views/admin/resource/New.vue"),
                      }
                  ]   
              }
            ]
          },
          
      ]
    },
    {
      path: "/",
      name: "Main",
      component: () => import("@/layouts/Main.vue"),
      meta: {
        requiresAuth: true,
      },      
      children: [
        {
          path: "",
          name: "Home",
          component: () =>
            import("@/views/Home.vue"),
        },
        {
          path: "about",
          name: "About",
          component: () =>
            import("@/views/About.vue"),
        },
      ]
    },
  ];

  export default routes;