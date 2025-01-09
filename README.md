Technologies:
->Backend
ASP Dot Core Web api(7)
Entity Framework Core for database operation

->FrontEnd
React Js(version:18.3.1)


Prerequisites
->Node.js
->npm or yarn package manager
->.Net SDK(Microsoft visiual studio)(Version:7)
->SQL Server Management System for database



key packages
Frontend
->Axios
->Axios for Http requests
->React router dom
->boostrap

->Backend
->dotnet add package Microsoft.EntityFrameworkCore.Design
->dotnet add package Microsoft.EntityFrameworkCore.SqlServer
->dotnet add package Microsoft.EntityFrameworkCore.Tools
->dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson


Steps to follow

1)Clone the Repository to loacl machine
git clone <repository-url>

Frontend
1)Navigate to todoappfrontend folder
cd todoappfrontend

2)Install dependencies
npm install

3)start vite devlopment server
npm run dev

->>the frontend should now be running at your localhost

 Backend
 1)Navigate to ToDoAppBackend by opening in Visiual studio software
 cd ToDoAppBackend

 2)Restore NuGet packages:
 cmd - dotnet restore

 3)Set Up the Connection String in appsettings.json file

 4)Apply Migrations
 dotnet ef database update

5)cmd - dotnet build

6)Start the backend server:
cmd - dotnet run
->>The backend should now be running at your localhost



Architectural Design
![image alt](https://github.com/manishapalsam/TODOAPP/blob/61447e9e34ad7a11187204bcdbc0c7826802f1a2/ARCHITECTURE.png)
