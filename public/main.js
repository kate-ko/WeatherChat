import DataManager from './data-manager.js'
import EventsHandler from './events-handler.js' 

let dataManager = new DataManager()
let eventsHandler = new EventsHandler(dataManager)

eventsHandler.registerCheckCity()
eventsHandler.registerRemoveCity()
eventsHandler.registerToggleForecasts()
eventsHandler.registerSort()
eventsHandler.init()

