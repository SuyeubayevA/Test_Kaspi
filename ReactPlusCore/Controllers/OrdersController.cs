using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPlusCore.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPlusCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public OrdersController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select 
                                OrderId, 
                                status, 
                                address, 
                                CartNumber, 
                                sum(Quantity) as Quantity, 
                                orderDate 
                            from Orders 
                            group by OrderId, status, address, CartNumber, orderDate
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult(table);
        }

        [Route("GetById")]
        [HttpPost]
        public JsonResult GetById([FromBody] OrderGetById Id)
        {
            string query = @"p_getOrderInfo";


            DataTable table = new DataTable("Order");
            table.Columns.Add("OrderId", typeof(string));
            table.Columns.Add("status", typeof(string));
            table.Columns.Add("address", typeof(string));
            table.Columns.Add("CartNumber", typeof(string));
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Quantity", typeof(int));
            table.Columns.Add("commonPrice", typeof(int));
            table.Columns.Add("orderDate", typeof(string));

            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", Id.Id.ToString());
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows) // если есть данные
                    {


                        while (reader.Read()) // построчно считываем данные
                        {
                            object id = reader.GetValue(0);
                            object name = reader.GetValue(1);
                            object age = reader.GetValue(2);
                            table.Rows.Add(reader.GetValue(0), reader.GetValue(1), reader.GetValue(2), reader.GetValue(3), reader.GetValue(4), reader.GetValue(5), reader.GetValue(6), reader.GetValue(7));

                        }
                    }
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(List<Order> orders)
        {
            string query = @"p_addOrders";

            DataTable table = new DataTable("Orders");
            table.Columns.Add("OrderId", typeof(string));
            table.Columns.Add("goodId", typeof(int));
            table.Columns.Add("status", typeof(string));
            table.Columns.Add("address", typeof(string));
            table.Columns.Add("CartNumber", typeof(string));
            table.Columns.Add("Quantity", typeof(int));
            var orderGUID = Guid.NewGuid().ToString();

            foreach (Order order in orders)
            {
                table.Rows.Add(orderGUID, order.goodId, order.status, order.address, order.CartNumber, order.Quantity);
            }
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");

            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con) { CommandType = CommandType.StoredProcedure })
                {
                    cmd.Parameters.AddWithValue("@OrdersTempTable", table);

                    SqlDataReader reader = cmd.ExecuteReader();

                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Add Successfully");
        }

        [HttpPut("{id}")]
        public JsonResult Put(string id)
        {
            string query = @"update dbo.Orders
                                set 
                                status = 'SUCCESS'
                             where OrderId=@Id
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Update Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            string query = @"delete from dbo.Orders
                             where OrderId=@Id
                            ";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MainConnection");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Delete Successfully");
        }
    }


    public class OrderGetById
    {
        public string Id { get; set; }
    }
}
