﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPlusCore.Model
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderId { get; set; }
        public int goodId { get; set; }
        public string status { get; set; }
        public string address { get; set; }
        public string CartNumber { get; set; }
        public int Quantity { get; set; }
    }

    public class SendingOrder
    {
        public List<Order> orders { get; set; }
        public string message { get; set; }
    }
}
