using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Xml.Linq;
using Vidyano.Service;
using Vidyano.Service.Repository;

namespace Websites.Service
{
    public class WebsitesAdvanced: Advanced
    {
        private static readonly string ConnectionString;

        static WebsitesAdvanced()
        {
            var webConfigDevelopment = HostingEnvironment.MapPath("~/Web.Development.config");
            if (!File.Exists(webConfigDevelopment))
                return;

            var config = XDocument.Load(webConfigDevelopment);
            var connectionString = config.Root.Element("connectionStrings");
            var vidyano = connectionString.Elements().FirstOrDefault(e => (string)e.Attribute("name") == "Vidyano");
            if (vidyano != null)
                ConnectionString = (string)vidyano.Attribute("connectionString");
        }

        public override EntityConnection CreateRepositoryConnection(string connectionString)
        {
            return base.CreateRepositoryConnection(ConnectionString ?? connectionString);
        }

        public override void PreCommandExecute(DbCommand command)
        {
            var connStringBuilder = new SqlConnectionStringBuilder(command.Connection.ConnectionString);
            command.CommandText = command.CommandText.Replace("[Vidyano].", $"[{connStringBuilder.UserID}].");

            base.PreCommandExecute(command);
        }
    }
}