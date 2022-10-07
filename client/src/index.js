import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter} from "react-router-dom"
import {  QuestionProvider } from './context/question.context';
import {  VideoProvider } from './context/videos.context';
import {  ArticleProvider } from './context/articles.context';
import {  QuestionpostProvider } from './context/question.post';
import {  ArticlepostProvider } from './context/articles.post';
import {  UserProvider } from './context/user.context';
import {  PlayProvider } from './context/play.context';
import {  TalkProvider } from './context/talk.context';
import {  NotificationProvider } from './context/notification.context';
import { CurrentQuestionProvider} from './context/currentquestion.context';
import { CurrentArticleProvider} from './context/currentarticle.context';
ReactDOM.render(
  <BrowserRouter> 
  <QuestionpostProvider>
  <ArticlepostProvider>
  <QuestionProvider>
   <ArticleProvider>
   <UserProvider>
    <VideoProvider>
    <PlayProvider>
    <TalkProvider>
    <NotificationProvider>
    <CurrentQuestionProvider>
    <CurrentArticleProvider>
  < App/>
  </CurrentArticleProvider>
  </CurrentQuestionProvider>
  </NotificationProvider>
  </TalkProvider>
  </PlayProvider>
  </VideoProvider>
  </UserProvider>
  </ArticleProvider>
  </QuestionProvider>
  </ArticlepostProvider>
  </QuestionpostProvider>
  </BrowserRouter>,
  document.getElementById('root')
);