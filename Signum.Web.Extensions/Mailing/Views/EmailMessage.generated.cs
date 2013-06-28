﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.18046
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Signum.Web.Extensions.Mailing.Views
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Text;
    using System.Web;
    using System.Web.Helpers;
    using System.Web.Mvc;
    using System.Web.Mvc.Ajax;
    using System.Web.Mvc.Html;
    using System.Web.Routing;
    using System.Web.Security;
    using System.Web.UI;
    using System.Web.WebPages;
    
    #line 1 "..\..\Mailing\Views\EmailMessage.cshtml"
    using Signum.Engine;
    
    #line default
    #line hidden
    using Signum.Entities;
    
    #line 2 "..\..\Mailing\Views\EmailMessage.cshtml"
    using Signum.Entities.Mailing;
    
    #line default
    #line hidden
    using Signum.Utilities;
    using Signum.Web;
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Mailing/Views/EmailMessage.cshtml")]
    public partial class EmailMessage : System.Web.Mvc.WebViewPage<dynamic>
    {
        public EmailMessage()
        {
        }
        public override void Execute()
        {



            
            #line 3 "..\..\Mailing\Views\EmailMessage.cshtml"
 using (var e = Html.TypeContext<EmailMessageDN>())
{
    
            
            #line default
            #line hidden
            
            #line 5 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.EntityList(e, f => f.Recipients));

            
            #line default
            #line hidden
            
            #line 5 "..\..\Mailing\Views\EmailMessage.cshtml"
                                          
    
            
            #line default
            #line hidden
            
            #line 6 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.EntityLine(e, f => f.Template, f => f.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 6 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                                
    
            
            #line default
            #line hidden
            
            #line 7 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.ValueLine(e, f => f.Sent, f => f.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 7 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                           
    
            
            #line default
            #line hidden
            
            #line 8 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.ValueLine(e, f => f.Received, f => f.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 8 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                               
    
            
            #line default
            #line hidden
            
            #line 9 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.EntityLine(e, f => f.Exception, f => f.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 9 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                                 
    
            
            #line default
            #line hidden
            
            #line 10 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.ValueLine(e, f => f.State, f => f.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 10 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                            
    
            
            #line default
            #line hidden
            
            #line 11 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.EntityLine(e, f => f.Package, f => f.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 11 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                               
    
            
            #line default
            #line hidden
            
            #line 12 "..\..\Mailing\Views\EmailMessage.cshtml"
Write(Html.ValueLine(e, f => f.Subject));

            
            #line default
            #line hidden
            
            #line 12 "..\..\Mailing\Views\EmailMessage.cshtml"
                                      

            
            #line default
            #line hidden
WriteLiteral("    <h3>");


            
            #line 13 "..\..\Mailing\Views\EmailMessage.cshtml"
   Write(EmailMessageMessage.Message.NiceToString());

            
            #line default
            #line hidden
WriteLiteral(":</h3>\r\n");



WriteLiteral("    <div>\r\n");


            
            #line 15 "..\..\Mailing\Views\EmailMessage.cshtml"
         if (e.Value.IsBodyHtml)
        {
            
            
            #line default
            #line hidden
            
            #line 17 "..\..\Mailing\Views\EmailMessage.cshtml"
       Write(Html.Raw(e.Value.Body));

            
            #line default
            #line hidden
            
            #line 17 "..\..\Mailing\Views\EmailMessage.cshtml"
                                   
        } 
        else
        {
          
            
            #line default
            #line hidden
            
            #line 21 "..\..\Mailing\Views\EmailMessage.cshtml"
     Write(Html.Raw(HttpUtility.HtmlEncode(e.Value.Body)));

            
            #line default
            #line hidden
            
            #line 21 "..\..\Mailing\Views\EmailMessage.cshtml"
                                                         
        }

            
            #line default
            #line hidden
WriteLiteral("    </div>\r\n");


            
            #line 24 "..\..\Mailing\Views\EmailMessage.cshtml"
}

            
            #line default
            #line hidden

        }
    }
}
#pragma warning restore 1591
