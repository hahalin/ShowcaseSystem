﻿namespace Showcase.Server.Api
{
    using System.Web.Http;
    using System.Web.Http.Cors;

    using Newtonsoft.Json.Serialization;

    using Showcase.Server.Api.Infrastructure;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Formatters.Clear();
            config.Formatters.Add(new BrowserJsonFormatter());

                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
        }
    }
}
