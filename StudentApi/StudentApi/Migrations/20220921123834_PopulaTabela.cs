using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentApi.Migrations
{
    public partial class PopulaTabela : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Age", "Email", "Name" },
                values: new object[] { 1, 32, "danilo.calegaro@hotmail.com", "Danilo Calegaro" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Age", "Email", "Name" },
                values: new object[] { 2, 23, "josericardo@hotmail.com", "José Ricardo" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
