﻿namespace Showcase.Services.Data
{
    using System.Linq;

    using Showcase.Data.Common.Repositories;
    using Showcase.Data.Models;
    using Showcase.Services.Data.Contracts;
    using System;
    using Showcase.Server.DataTransferModels.Statistics;
    using System.Collections.Generic;

    public class StatisticsService : IStatisticsService
    {
        private readonly DateTime ShowcaseLaunchDate = new DateTime(2015, 7, 23);

        private IRepository<Project> projects;

        public StatisticsService(IRepository<Project> projects)
        {
            this.projects = projects;
        }

        public object Current()
        {
            // TODO: count only approved, add model
            return this.projects
                .All()
                .GroupBy(pr => 0)
                .Select(gr => new
                {
                    TotalProjects = gr.Count(),
                    TotalViews = gr.Sum(pr => pr.Visits.Count()),
                    TotalComments = gr.Sum(pr => pr.Comments.Count()),
                    TotalLikes = gr.Sum(pr => pr.Likes.Count())
                })
                .FirstOrDefault();
        }

        public IQueryable<CountByDateModel> ProjectsLastSixMonths()
        {
            var todaySixMonthsAgo = DateTime.Now.AddMonths(-6);
            
            return this.projects
                .All()
                .Where(p => p.CreatedOn >= todaySixMonthsAgo)
                .GroupBy(s => s.CreatedOn.Month)
                .OrderBy(gr => gr.Key)
                .Select(gr => new CountByDateModel
                {
                    Date = gr.FirstOrDefault().CreatedOn,
                    Count = gr.Count()
                });
        }
    }
}
