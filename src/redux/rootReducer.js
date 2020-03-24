import { combineReducers } from 'redux';

import social_accounts from './social_accounts/reducer';
import authentication from './authenication/reducer';
import schedule_posts from './schedule_posts/reducer';
import media from './post_media/reducer';
import modal from './modal/reducer';
import date_time_picker from './date_time_picker/reducer';
import templates from './templates/reducer';
import elements from './elements/reducer';
import projects from './projects/reducer';
import files from './files/reducer';
import sidebar from './sidebar/reducer';
import customized_network from './customizable_network/reducer';
import social_type from './post_words_limit/reducer';

export default history =>
  combineReducers({
    social_accounts,
    authentication,
    schedule_posts,
    media,
    modal,
    date_time_picker,
    templates,
    elements,
    projects,
    files,
    sidebar,
    customized_network,
    social_type
  });
