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
    
    #line 3 "..\..\Mailing\Views\EmailTemplate.cshtml"
    using Signum.Engine.Basics;
    
    #line default
    #line hidden
    
    #line 2 "..\..\Mailing\Views\EmailTemplate.cshtml"
    using Signum.Engine.DynamicQuery;
    
    #line default
    #line hidden
    using Signum.Entities;
    
    #line 1 "..\..\Mailing\Views\EmailTemplate.cshtml"
    using Signum.Entities.Mailing;
    
    #line default
    #line hidden
    using Signum.Utilities;
    using Signum.Web;
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("RazorGenerator", "2.0.0.0")]
    [System.Web.WebPages.PageVirtualPathAttribute("~/Mailing/Views/EmailTemplate.cshtml")]
    public partial class EmailTemplate : System.Web.Mvc.WebViewPage<dynamic>
    {
        public EmailTemplate()
        {
        }
        public override void Execute()
        {



WriteLiteral("\r\n");


            
            #line 5 "..\..\Mailing\Views\EmailTemplate.cshtml"
Write(Html.ScriptsJs("~/Scripts/ckeditor/ckeditor.js"));

            
            #line default
            #line hidden
WriteLiteral("\r\n");


            
            #line 6 "..\..\Mailing\Views\EmailTemplate.cshtml"
Write(Html.ScriptCss("~/Mailing/Content/SF_Mailing.css"));

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n");


            
            #line 8 "..\..\Mailing\Views\EmailTemplate.cshtml"
 using (var ec = Html.TypeContext<EmailTemplateDN>())
{
    
            
            #line default
            #line hidden
            
            #line 10 "..\..\Mailing\Views\EmailTemplate.cshtml"
Write(Html.ValueLine(ec, e => e.Name));

            
            #line default
            #line hidden
            
            #line 10 "..\..\Mailing\Views\EmailTemplate.cshtml"
                                    
    
            
            #line default
            #line hidden
            
            #line 11 "..\..\Mailing\Views\EmailTemplate.cshtml"
Write(Html.ValueLine(ec, e => e.State, vl => vl.ReadOnly = true));

            
            #line default
            #line hidden
            
            #line 11 "..\..\Mailing\Views\EmailTemplate.cshtml"
                                                               
    

            
            #line default
            #line hidden
WriteLiteral("    <fieldset>\r\n        <legend>Properties</legend>\r\n        ");


            
            #line 15 "..\..\Mailing\Views\EmailTemplate.cshtml"
   Write(Html.EntityLine(ec, e => e.Query));

            
            #line default
            #line hidden
WriteLiteral("\r\n    </fieldset>\r\n");


            
            #line 17 "..\..\Mailing\Views\EmailTemplate.cshtml"
    
    if (ec.Value.Query != null) {
        object queryName = QueryLogic.ToQueryName(ec.Value.Query.Key);
        ViewData[ViewDataKeys.QueryDescription] = DynamicQueryManager.Current.QueryDescription(queryName); //To be use inside query token controls
    

            
            #line default
            #line hidden
WriteLiteral("        <fieldset>\r\n            <legend>Active</legend>\r\n            ");


            
            #line 24 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.ValueLine(ec, e => e.Active));

            
            #line default
            #line hidden
WriteLiteral("\r\n            ");


            
            #line 25 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.ValueLine(ec, e => e.StartDate));

            
            #line default
            #line hidden
WriteLiteral("\r\n            ");


            
            #line 26 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.ValueLine(ec, e => e.EndDate));

            
            #line default
            #line hidden
WriteLiteral("\r\n        </fieldset>\r\n");



WriteLiteral("        <fieldset>\r\n            <legend>From/Recipients</legend>\r\n            ");


            
            #line 30 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.EntityLineDetail(ec, e => e.From, el => el.PreserveViewData = true));

            
            #line default
            #line hidden
WriteLiteral("\r\n            ");


            
            #line 31 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.EntityRepeater(ec, e => e.Recipients, el => el.PreserveViewData = true));

            
            #line default
            #line hidden
WriteLiteral("\r\n        </fieldset>\r\n");


            
            #line 33 "..\..\Mailing\Views\EmailTemplate.cshtml"
        
            
            #line default
            #line hidden
            
            #line 33 "..\..\Mailing\Views\EmailTemplate.cshtml"
   Write(Html.EntityLine(ec, e => e.SmtpConfiguration));

            
            #line default
            #line hidden
            
            #line 33 "..\..\Mailing\Views\EmailTemplate.cshtml"
                                                      

            
            #line default
            #line hidden
WriteLiteral("        <fieldset>\r\n            <legend>Text</legend>\r\n            ");


            
            #line 36 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.EntityLine(ec, e => e.MasterTemplate));

            
            #line default
            #line hidden
WriteLiteral("\r\n            ");


            
            #line 37 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.ValueLine(ec, e => e.IsBodyHtml));

            
            #line default
            #line hidden
WriteLiteral("\r\n            ");


            
            #line 38 "..\..\Mailing\Views\EmailTemplate.cshtml"
       Write(Html.ValueLine(ec, e => e.EditableMessage));

            
            #line default
            #line hidden
WriteLiteral("\r\n        \r\n            <div class=\"sf-email-replacements-container sf-tabs-repea" +
"ter\">      \r\n                ");


            
            #line 41 "..\..\Mailing\Views\EmailTemplate.cshtml"
           Write(Html.EntityRepeater(ec, e => e.Messages, er =>
                {
                    er.Removing = "";
                    er.Creating = "SF.TabsRepeater.addItem();";
                    er.PreserveViewData = true;
                }));

            
            #line default
            #line hidden
WriteLiteral("\r\n            </div> \r\n        </fieldset>\r\n");


            
            #line 49 "..\..\Mailing\Views\EmailTemplate.cshtml"
    }
}

            
            #line default
            #line hidden

            
            #line 51 "..\..\Mailing\Views\EmailTemplate.cshtml"
Write(Html.ScriptsJs("~/Mailing/Scripts/SF_Mailing.js"));

            
            #line default
            #line hidden
WriteLiteral("\r\n");


            
            #line 52 "..\..\Mailing\Views\EmailTemplate.cshtml"
Write(Html.ScriptsJs("~/Mailing/Scripts/SF_TabsRepeater.js"));

            
            #line default
            #line hidden
WriteLiteral("\r\n\r\n<script>\r\n    $(function () {\r\n        SF.Mailing.initReplacements();\r\n    })" +
";\r\n</script>");


        }
    }
}
#pragma warning restore 1591
