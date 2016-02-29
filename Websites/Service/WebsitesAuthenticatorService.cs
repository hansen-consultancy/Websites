using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Vidyano.Core.Extensions;
using Vidyano.Service;
using Vidyano.Service.Repository;

namespace Websites.Service
{
    public class WebsitesAuthenticatorService : AuthenticatorService
    {
        // NOTE: This feature requires an Application license (http://www.vidyano.com/Documentation/security)

        //public override bool CheckUserCredentials(UserCredentials credentials)
        //{
        //    // NOTE: This can use any external provider to validate users (AD, webservice, ...)
        //    // Failed logins can return false to show the default message (Invalid username or password) or throw an exception to use a custom message (Can't connect to AD...)
        //
        //    // Example: Find the user in the repository
        //    var user = GetUser(credentials.UserName);
        //    // As sample, check if the user exists and that the password matches
        //    return user != null && user.CheckPassword(credentials.Password);
        //}

        //public override IUser GetUser(UserCredentials credentials)
        //{
        //    // Get the user by its name
        //    return GetUser(credentials.UserName);
        //}

        //public override string GetFriendlyUserName(UserCredentials credentials, IUser user)
        //{
        //    // Return null or an empty string to use the friendly name defined for the user
        //    if (string.Equals(user.Name, "admin", StringComparison.InvariantCultureIgnoreCase))
        //        return "Administrator";
        //
        //    return null;
        //}
    }
}