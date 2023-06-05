﻿using mms.Domain.Entities;
using mms.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mms.Application.UserTasks.Query
{
    public class GetUserTasksResponse
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public string CreatedBy { get; set; }
        public UserTaskStatus Status { get; set; }
        public string ProgramId { get; set; }

    }
}
