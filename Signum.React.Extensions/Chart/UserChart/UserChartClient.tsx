﻿import * as React from 'react'
import { Route } from 'react-router'
import { ajaxPost, ajaxGet } from '../../../../Framework/Signum.React/Scripts/Services';
import { EntitySettings } from '../../../../Framework/Signum.React/Scripts/Navigator'
import * as Navigator from '../../../../Framework/Signum.React/Scripts/Navigator'
import * as Finder from '../../../../Framework/Signum.React/Scripts/Finder'
import { getQueryKey } from '../../../../Framework/Signum.React/Scripts/Reflection'
import { EntityOperationSettings } from '../../../../Framework/Signum.React/Scripts/Operations'
import { Entity, Lite, liteKey } from '../../../../Framework/Signum.React/Scripts/Signum.Entities'
import * as Constructor from '../../../../Framework/Signum.React/Scripts/Constructor'
import * as Operations from '../../../../Framework/Signum.React/Scripts/Operations'
import * as QuickLinks from '../../../../Framework/Signum.React/Scripts/QuickLinks'
import { FindOptions, FilterOption, FilterOperation, OrderOption, ColumnOption, FilterRequest, QueryRequest, Pagination } from '../../../../Framework/Signum.React/Scripts/FindOptions'
import * as AuthClient  from '../../../../Extensions/Signum.React.Extensions/Authorization/AuthClient'
import { UserChartEntity, UserChartEntity_Type, ChartPermission, ChartMessage, ChartRequest, ChartRequest_Type, ChartParameterEntity_Type, ChartColumnEntity_Type  } from '../Signum.Entities.Chart'
import { QueryFilterEntity, QueryFilterEntity_Type, QueryOrderEntity, QueryOrderEntity_Type } from '../../UserQueries/Signum.Entities.UserQueries'
import { QueryTokenEntity, QueryTokenEntity_Type } from '../../UserAssets/Signum.Entities.UserAssets'
import UserChartMenu from './UserChartMenu'
import * as ChartClient from '../ChartClient'
import * as UserAssetsClient from '../../UserAssets/UserAssetClient'


export function start(options: { routes: JSX.Element[] }) {

    ChartClient.ButtonBarChart.onButtonBarElements.push(ctx => {
        if (!AuthClient.isPermissionAuthorized(ChartPermission.ViewCharting))
            return null;

        return <UserChartMenu chartRequestView={ctx.chartRequestView}/>;
    }); 

    QuickLinks.registerGlobalQuickLink(ctx => {
        if (!AuthClient.isPermissionAuthorized(ChartPermission.ViewCharting))
            return null;

        return API.forEntityType(ctx.lite.EntityType).then(uqs =>
            uqs.map(uc => new QuickLinks.QuickLinkAction(liteKey(uc), uc.toStr, e => {
                Navigator.API.fetchAndForget(uc)
                    .then(uq => Converter.toChartRequest(uq, null))
                    .then(cr => window.open(ChartClient.Encoder.chartRequestPath(cr)))
                    .done();
            }, { glyphicon: "glyphicon-list-alt", glyphiconColor: "dodgerblue" })));
    });

    QuickLinks.registerQuickLink(UserChartEntity_Type, ctx => new QuickLinks.QuickLinkAction("preview", ChartMessage.Preview.niceToString(),
        e => {
            Navigator.API.fetchAndRemember(ctx.lite).then(uc => {
                if (uc.entityType == null)
                    return Converter.toChartRequest(uc, null);
                else
                    return Navigator.API.fetchAndForget(uc.entityType)
                        .then(t => Finder.find({ queryName: t.cleanName }))
                        .then(lite => lite == null ? null : Converter.toChartRequest(uc, lite));
            }).then(cr => {

                if (cr == null)
                    return;

                window.open(ChartClient.Encoder.chartRequestPath(cr));
            });
        }, { isVisible: AuthClient.isPermissionAuthorized(ChartPermission.ViewCharting) }));


    Navigator.addSettings(new EntitySettings(UserChartEntity_Type, e => new Promise(resolve => require(['./UserChart'], resolve))));
}


export module Converter {

    export function applyUserChart(cr: ChartRequest, uq: UserChartEntity, entity: Lite<Entity>): Promise<ChartRequest> {

        var convertedFilters = UserAssetsClient.API.parseFilters({
            queryKey: uq.query.key,
            canAggregate: false,
            entity: entity,
            filters: uq.filters.map(mle => mle.element).map(f => ({
                tokenString: f.token.tokenString,
                operation: f.operation,
                valueString: f.valueString
            }) as UserAssetsClient.API.ParseFilterRequest)
        });

        return convertedFilters.then(filters => {

            cr.chartScript = uq.chartScript;

            if (filters) {
                cr.filterOptions = (cr.filterOptions || []).filter(f => f.frozen);
                cr.filterOptions.push(...filters.map(f => ({
                    columnName: f.token,
                    operation: f.operation,
                    value: f.value,
                }) as FilterOption));
            }

            cr.parameters = uq.parameters.map(mle => ({
                rowId: null,
                element: ChartParameterEntity_Type.New(p => {
                    p.name = mle.element.name;
                    p.value = mle.element.value;
                })
            }));

            cr.columns = uq.columns.map(mle => ({
                rowId: null,
                element: ChartColumnEntity_Type.New(c => {
                    c.displayName = mle.element.displayName;
                    c.token = mle.element.token;
                })
            }));
            
            cr.orderOptions = (uq.orders || []).map(f => ({
                columnName: f.element.token.tokenString,
                orderType: f.element.orderType
            }) as OrderOption);

            return ChartClient.parseTokens(cr);
        });
    }

    export function toChartRequest(uq: UserChartEntity, entity: Lite<Entity>): Promise<ChartRequest> {
        var cs = ChartRequest_Type.New(cr => cr.queryKey = uq.query.key); 
        return applyUserChart(cs, uq, entity);
    }
}


export module API {
    export function forEntityType(type: string): Promise<Lite<UserChartEntity>[]> {
        return ajaxGet<Lite<UserChartEntity>[]>({ url: "/api/userChart/forEntityType/" + type });
    }

    export function forQuery(queryKey: string): Promise<Lite<UserChartEntity>[]> {
        return ajaxGet<Lite<UserChartEntity>[]>({ url: "/api/userChart/forQuery/" + queryKey });
    }

    export function fromChartRequest(chartRequest: ChartRequest): Promise<UserChartEntity> {

        var clone = ChartClient.API.cleanedChartRequest(chartRequest)

        return ajaxPost<UserChartEntity>({ url: "/api/userChart/fromChartRequest/" }, clone);
    }
}