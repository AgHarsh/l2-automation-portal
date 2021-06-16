import {ServiceController} from "./controller/ServiceController";
import {ServerGrpController} from "./controller/ServerGrpController";
import {ServerController} from "./controller/ServerController";
import {AlertController} from "./controller/AlertController";
import {ScriptController} from "./controller/ScriptController";

export const Routes = [{
    method: "get",
    route: "/service",
    controller: ServiceController,
    action: "all"
}, {
    method: "get",
    route: "/service/:id",
    controller: ServiceController,
    action: "one"
}, {
    method: "post",
    route: "/service",
    controller: ServiceController,
    action: "save"
}, {
    method: "delete",
    route: "/service/:id",
    controller: ServiceController,
    action: "remove"
}, {
    method: "get",
    route: "/servergrp",
    controller: ServerGrpController,
    action: "all"
}, {
    method: "get",
    route: "/server",
    controller: ServerController,
    action: "all"
}, {
    method: "get",
    route: "/alert",
    controller: AlertController,
    action: "all"
}, {
    method: "get",
    route: "/script",
    controller: ScriptController,
    action: "all"
}];