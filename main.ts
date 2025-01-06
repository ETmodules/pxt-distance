//% color="#EEAA00" icon="\uf028"
//% block="ET: Distance"
//% block.loc.nl="ET: Distance"
namespace EtDistance {
    let MODULE = "EtDistance"

    export enum Orientation {
        //% block="at front"
        //% block.loc.nl="van voren"
        Front,
        //% block="at the left"
        //% block.loc.nl="vanaf links"
        Left,
        //% block="at the right"
        //% block.loc.nl="vanaf rechts"
        Right
    }

    export enum Distance {
        //% block="normal"
        //% block.loc.nl="normaal"
        Normal,
        //% block="nearby"
        //% block.loc.nl="dichtbij"
        Near,
        //% block="far away"
        //% block.loc.nl="verweg"
        Away
    }

    let EventFrontNormal: EtCommon.eventHandler
    let EventFrontNear: EtCommon.eventHandler
    let EventFrontAway: EtCommon.eventHandler
    let EventLeftNormal: EtCommon.eventHandler
    let EventLeftNear: EtCommon.eventHandler
    let EventLeftAway: EtCommon.eventHandler
    let EventRightNormal: EtCommon.eventHandler
    let EventRightNear: EtCommon.eventHandler
    let EventRightAway: EtCommon.eventHandler

    export function onEventFrontNormal(id: string) {
        if (EventFrontNormal) EventFrontNormal(id)
    }

    export function onEventFrontNear(id: string) {
        if (EventFrontNear) EventFrontNear(id)
    }

    export function onEventFrontAway(id: string) {
        if (EventFrontAway) EventFrontAway(id)
    }

    export function onEventLeftNormal(id: string) {
        if (EventLeftNormal) EventLeftNormal(id)
    }

    export function onEventLeftNear(id: string) {
        if (EventLeftNear) EventLeftNear(id)
    }

    export function onEventLeftAway(id: string) {
        if (EventLeftAway) EventLeftAway(id)
    }

    export function onEventRightNormal(id: string) {
        if (EventRightNormal) EventRightNormal(id)
    }

    export function onEventRightNear(id: string) {
        if (EventRightNear) EventRightNear(id)
    }

    export function onEventRightAway(id: string) {
        if (EventRightAway) EventRightAway(id)
    }

    //% block="ID"
    //% block.loc.nl="ID"
    export function id(): string {
        return MODULE
    }

    //% block="set module id to %id"
    //% block.loc.nl="stel de module id in op %id"
    //% id.defl="EtDistance"
    export function setModuleId(id: string) {
        MODULE = id
    }

    //% block="with %id %name is %dist cm"
    //% block.loc.nl="voor %id is %name %dist cm"
    //% id.defl="EtDistance"
    //% dist.min=20 dist.max=300 dist.defl=50
    export function setDistance(id: string, name: Distance, dist: number) {
        switch (name) {
            case Distance.Normal:
                EtCommon.setValue(id, "normal", dist.toString())
                break
            case Distance.Normal:
                EtCommon.setValue(id, "near", dist.toString())
                break
            case Distance.Normal:
                EtCommon.setValue(id, "away", dist.toString())
                break
        }
    }

    //% block="when the distance %ori to %id is %dist"
    //% block.loc.nl="wanneer de afstand %ori tot %dist %id is"
    //% id.defl="EtDistance"
    export function onDistance(ori: Orientation, id: string, dist: Distance, programmableCode: () => void): void {
        let event: EtCommon.eventHandler
        let item: EtCommon.eventItem
        let sig: string
        switch (ori) {
            case Orientation.Front:
                switch (dist) {
                    case Distance.Normal: EventFrontNormal = programmableCode;
                        event = onEventFrontNormal;
                        sig = "frontnormal"
                        break;
                    case Distance.Near: EventFrontNear = programmableCode;
                        event = onEventFrontNear;
                        sig = "frontnear"
                        break;
                    case Distance.Away: EventFrontAway = programmableCode;
                        event = onEventFrontAway;
                        sig = "frontaway"
                        break;
                }
                break;
            case Orientation.Left:
                switch (dist) {
                    case Distance.Normal: EventLeftNormal = programmableCode;
                        event = onEventLeftNormal;
                        sig = "leftnormal"
                        break;
                    case Distance.Near: EventLeftNear = programmableCode;
                        event = onEventLeftNear;
                        sig = "leftnear"
                        break;
                    case Distance.Away: EventLeftAway = programmableCode;
                        event = onEventLeftAway;
                        sig = "leftaway"
                        break;
                }
                break;
            case Orientation.Right:
                switch (dist) {
                    case Distance.Normal: EventRightNormal = programmableCode;
                        event = onEventRightNormal;
                        sig = "rightnormal"
                        break;
                    case Distance.Near: EventRightNear = programmableCode;
                        event = onEventRightNear;
                        sig = "rightnear"
                        break;
                    case Distance.Away: EventRightAway = programmableCode;
                        event = onEventRightAway;
                        sig = "rightaway"
                        break;
                }
                break;
        }
        item = { handler: event, module: id, signal: sig };
        EtCommon.eventArray.push(item)
    }
}
