﻿using AspNetCoreHero.Results;
using MediatR;
using mms.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mms.Application.UserTasks.Command.CreateTask
{
    public class CreateTaskCommand: IRequest<IResult<string>>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public string CreatedBy { get; set; }
        public string Status { get; set; }
        public string ProgramId { get; set; }
        public IList<AppUser> Managers { get; set; }
    }
}