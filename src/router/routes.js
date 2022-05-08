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
          path: "exam-results",
          name: "ExamResults",
          component: () =>
            import("@/views/admin/exam-results/Index.vue"),
        },
        {
          path: "exam-group/:eg_id/exam-results",
          name: "ExamGroupResults",
          component: () =>
            import("@/views/admin/exam-results/ExamroupResults.vue"),
        },
        {
          path: "level/:level_id/type/:question_type/qp/:qp_id/resource",
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
          path: "level/:level_id/type/:question_type/qp/:qp_id/question/:question_id/answer",
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
          path: "level/:level_id/type/:question_type/folder/:folder_id/qp/:qp_id/fill",
          name: "QuestionPlan",
          component: () =>
            import("@/views/admin/question-plan/Index.vue"),
          children: [
              {
                path: 'add',
                name: 'AddQuestion',
                component: () => import("@/views/admin/question/New.vue"),
              },
              // {
              //     path: ':question_id/edit',
              //     name: 'EditQuestion',
              //     component: () => import("@/views/admin/question/Edit.vue"),
              // }
          ]
        },
        {
          path: "level/:level_id/type/:question_type/qp/:qp_id/question",
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
          path: "level/:level_id/type/:question_type/folder/:folder_id",
          name: "ResourceAndQuestionsByLevelAndType",
          component: () =>
            import("@/views/admin/ResourceAndQuestions2.vue"),
        },
        {
          path: "level/:level_id/type/:question_type",
          name: "ResourceAndQuestionsByLevelAndType",
          component: () =>
            import("@/views/admin/folder/Index.vue"),
        },
      ]
    },
    {
      path: "/assesser",
      name: "AssesserMain",
      component: () => import("@/layouts/Main.vue"),
      meta: {
        requiresAuth: true,
      },      
      children: [
        {
          path: "",
          name: "AssesserHome",
          component: () =>
            import("@/views/assesser/Index.vue"),
        },
        {
          path: "exam/:exam_id",
          name: "AssesserExam",
          component: () =>
            import("@/views/assesser/Exam.vue"),
        },
      ]  
    },
    {
      path: "/invigilator",
      name: "InvigilatorMain",
      component: () => import("@/layouts/Main.vue"),
      meta: {
        requiresAuth: true,
      },      
      children: [
        {
          path: "",
          name: "InvigilatorHome",
          component: () =>
            import("@/views/invigilator/Index.vue"),
        },
        {
          path: "checking-page",
          name: "InvigilatorCheckingPage",
          component: () =>
            import("@/views/invigilator/CheckingPage.vue"),
        },
        {
          path: "checking-examgroup/:examgroup_id",
          name: "InvigilatorCheckingExamgroup",
          component: () =>
            import("@/views/invigilator/CheckingExams.vue"),
        },
        {
          path: "ceg/:examgroup_id/result/:result_id/mark",
          name: "InvigilatorMarkExam",
          component: () =>
            import("@/views/invigilator/Mark.vue"),
        }
      ] 
    },
    {
      path: "/supervisor",
      name: "SupervisorMain",
      component: () => import("@/layouts/Main.vue"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "SupervisorHome",
          component: () =>
            import("@/views/supervisor/Index.vue"),
        },
        {
          path: "group/:id",
          name: "SupervisorStudents",
          component: () =>
            import("@/views/supervisor/Students.vue"),
        },
        {
          path: "student/:id/questions",
          name: "SupervisorStudentsQuestions",
          component: () =>
            import("@/views/supervisor/Questions.vue"),
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