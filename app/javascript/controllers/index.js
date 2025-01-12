// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import CounterController from "./counter_controller"
application.register("counter", CounterController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import ValueTransferController from "./value_transfer_controller"
application.register("value-transfer", ValueTransferController)
