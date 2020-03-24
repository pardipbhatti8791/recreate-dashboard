import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function SocialAccountsTypesAndLimits() {
  /**
   * * @ accounts type
   */
  const accounts = useSelector(state => state.social_type);
  const account_type = useSelector(state => state.social_type);
  let uniq = {};
  return (
    <div>
      {accounts.set_accounts.length > 0 &&
        accounts.set_accounts
          .filter(f => !uniq[f.provider] && (uniq[f.provider] = true))
          .map(acctType => {
            switch (acctType.provider) {
              case 'facebook':
                return (
                  <Fragment>
                    <img
                      src='/images/facebook.png'
                      alt='image_name'
                      style={{ width: 15 }}
                    />
                    {account_type.facebook}
                  </Fragment>
                );
              case 'linkedin':
                return (
                  <Fragment>
                    <img
                      src='/images/linkedin.png'
                      alt='image_name'
                      style={{ width: 15 }}
                    />
                    {account_type.linkedin}
                  </Fragment>
                );
              case 'twitter':
                return (
                  <Fragment>
                    <img
                      src='/images/twitter.png'
                      alt='image_name'
                      style={{ width: 15 }}
                    />
                    {account_type.twitter}
                  </Fragment>
                );
              case 'instagram':
                return (
                  <Fragment>
                    <img
                      src='/images/instagram.png'
                      alt='image_name'
                      style={{ width: 15 }}
                    />
                    {account_type.instagram}
                  </Fragment>
                );
              default:
                return false;
            }
          })}
    </div>
  );
}
