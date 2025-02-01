import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletecategoryComponent } from './components/deletecategory/deletecategory.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ContributersComponent } from './pages/contributers/contributers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { UserArticleComponent } from './pages/user/user-article/user-article.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { UserLodaquizComponent } from './pages/user/user-lodaquiz/user-lodaquiz.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }, {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  }, {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }, {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }, {
        path: 'categories',
        component: ViewCategoriesComponent,
      }, {
        path: 'addcategories',
        component: AddCategoryComponent
      }, {
        path: 'contributers',
        component: ContributersComponent
      }, {
        path: 'categories/:cid',
        component: DeletecategoryComponent
      }, {
        path: 'article',
        component: ViewQuizzesComponent
      }, {
        path: 'addArticle',
        component: AddQuizComponent
      }, {
        path: 'quiz/:qid',
        component: UpdateQuizComponent
      }, {
        path: 'view-questions/:qid/:title',
        component: ViewQuestionsComponent
      }, {
        path: 'add-questions/:qid/:title',
        component: AddQuestionsComponent
      }, {
        path: 'update-questions/:quesId/:title',
        component: UpdateQuestionComponent
      },{
        path: 'article/:catId',
        component: UserLodaquizComponent,
      },{
        path:'readarticle/:quizId',
        component:UserArticleComponent
      },{
        path:'quizinstructions/:quizId',
        component:QuizInstructionsComponent
      }
    ],
  }, {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: '',
        component: UserHomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'article/:catId',
        component: UserLodaquizComponent,
      },{
        path:'readarticle/:quizId',
        component:UserArticleComponent
      }, {
        path: 'contributers',
        component: ContributersComponent
      },{
        path:'quizinstructions/:quizId',
        component:QuizInstructionsComponent
      }
    ]
  },{
    path:'start-quiz/:quizId',
    component:StartQuizComponent,
    canActivate:[NormalGuard]
  },{
    path:'admin-start-quiz/:quizId',
    component:StartQuizComponent,
    canActivate:[AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
