export const apiPaths = {
  get_social_accounts: `post/api/socialaccounts`,
  connect_account: `post/api/connect`,
  linked_in_account: `post/api/linkedin/token`,
  instagram_account: `post/api/instagram/token`,
  twitter_request_token:
    'https://pyxis.azure-api.net/post/api/twitter/token/request/',
  twitter_exchange_token:
    'https://pyxis.azure-api.net/post/api/twitter/token/exchange/',
  user_management: {
    registration: 'user/auth/register/',
    login: 'user/auth/login/',
    profile: 'user/auth/user/'
  },
  schedule_post: {
    get_post_time: 'post/api/schedule/?',
    update_post_time: 'post/api/schedule/update',
    get_scheduled_posts: 'post/api/post/?',
    update_schedule_timezone: 'post/api/schedule/update/timezone'
  },
  media: {
    get_media: 'post/api/media',
    upload_media: '/post/api/media/'
  },
  create_post: {
    create_post: '/post/api/post/new/',
    update_post: '/post/api/post',
    swap_post: 'post/api/post/swap/'
  },
  templates: {
    list_templates: '/project/api/template'
  },
  elements: {
    list_categories: '/project/api/element/category'
  },
  projects: {
    list_projects: '/project/api/project',
    create_projects: '/project/api/project',
  },
  files: {
    list_files: '/project/api/file'
  }
};
