using AutoMapper;
using ControlMando.Core.CustomEntities;
using ControlMando.Core.Interfaces;
using ControlMando.Core.Services;
using ControlMando.Infrastructure.Data;
using ControlMando.Infrastructure.Filters;
using ControlMando.Infrastructure.Interfaces;
using ControlMando.Infrastructure.Repositories;
using ControlMando.Infrastructure.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace ControlMando.Api
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                                  });
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddControllers(options => {

                options.Filters.Add<GlobalExceptionFilter>();
            
            }).AddNewtonsoftJson(options => {

                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;

            })
                .ConfigureApiBehaviorOptions(options => {

                    //options.SuppressModelStateInvalidFilter = true;
                
         });

            //Cadena de conexion

            services.Configure<PaginationOptions>(Configuration.GetSection("Pagination"));

            services.AddDbContext<ControlMandoContext>( options =>

            options.UseSqlServer(Configuration.GetConnectionString("ControlMando"))

            );

            //Resolvemos las dependencias
            //cada vez que en el programa se haga uso de esta abstraccion se le va a entregar una instancia(Repository)
            //A esa interfaz que repositori le vamos a mandar

            services.AddTransient<IPersonaRepository,PersonaRepository>();
            services.AddTransient<IPersonaService, PersonaService>();
            services.AddSingleton<IUriService>(provider => {

                var acceso = provider.GetRequiredService<IHttpContextAccessor>();
                var request = acceso.HttpContext.Request;
                var absoluteUri = string.Concat(request.Scheme, "://",request.Host.ToUriComponent());

                return new UriService(absoluteUri); 

            });
            //Dependecias de los valdiators

            services.AddMvc(options =>
            {
                options.Filters.Add<ValidationFilter>();

            }).AddFluentValidation(options => {

                options.RegisterValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());
            
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
         
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();


            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
