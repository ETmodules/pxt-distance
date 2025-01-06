//% color="#EEAA00" icon="\uf028"
//% block="ET: Distance"
//% block.loc.nl="ET: Distance"
namespace EtDistance {
    let MODULE = "EtDistance"

    export enum Orientation {
        //% block="front"
        //% block.loc.nl="recht voor"
        ORI_FRONT,
        //% block="left"
        //% block.loc.nl="links voor"
        ORI_LEFT,
        //% block="right"
        //% block.loc.nl="rechts voor"
        ORI_RIGHT
    }

    let EventFrontNormal: EtCommon.eventHandler
    let EventFrontClose: EtCommon.eventHandler
    let EventFrontAway: EtCommon.eventHandler
    let EventLeftNormal: EtCommon.eventHandler
    let EventLeftClose: EtCommon.eventHandler
    let EventLeftAway: EtCommon.eventHandler
    let EventRightNormal: EtCommon.eventHandler
    let EventRightClose: EtCommon.eventHandler
    let EventRightAway: EtCommon.eventHandler

    export function onEventFrontNormal(id: string) {
        if (EventFrontNormal) EventFrontNormal(id)
    }

    export function onEventFrontClose(id: string) {
        if (EventFrontClose) EventFrontClose(id)
    }

    export function onEventFrontAway(id: string) {
        if (EventFrontAway) EventFrontAway(id)
    }

    export function onEventLeftNormal(id: string) {
        if (EventLeftNormal) EventLeftNormal(id)
    }

    export function onEventLeftClose(id: string) {
        if (EventLeftClose) EventLeftClose(id)
    }

    export function onEventLeftAway(id: string) {
        if (EventLeftAway) EventLeftAway(id)
    }

    export function onEventRightNormal(id: string) {
        if (EventRightNormal) EventRightNormal(id)
    }

    export function onEventRightClose(id: string) {
        if (EventRightClose) EventRightClose(id)
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
    //% id.defl="EtAudio"
    export function setModuleId(id: string) {
        MODULE = id
    }

    //% block="when %id measures %comp distance at %ori"
    //% block.loc.nl="wanneer %id op %ori dichtbij meet"
    //% id.defl="EtAudio"
    export function onDistance(id: string, ori: Orientation, comp: EtCommon.Comparison, programmableCode: () => void): void {
        let event: EtCommon.eventHandler
        let item: EtCommon.eventItem
        let sig: string
        switch (ori) {
            case Orientation.ORI_FRONT:
                switch (comp) {
                    case EtCommon.Comparison.COMP_NORMAL: EventFrontNormal = programmableCode;
                        event = onEventFrontNormal;
                        sig = "frontnormal"
                        break;
                    case EtCommon.Comparison.COMP_LESS: EventFrontClose = programmableCode;
                        event = onEventFrontClose;
                        sig = "frontclose"
                        break;
                    case EtCommon.Comparison.COMP_GREATER: EventFrontAway = programmableCode;
                        event = onEventFrontAway;
                        sig = "frontaway"
                        break;
                }
                break;
            case Orientation.ORI_LEFT:
                switch (comp) {
                    case EtCommon.Comparison.COMP_NORMAL: EventLeftNormal = programmableCode;
                        event = onEventLeftNormal;
                        sig = "leftnormal"
                        break;
                    case EtCommon.Comparison.COMP_LESS: EventLeftClose = programmableCode;
                        event = onEventLeftClose;
                        sig = "leftclose"
                        break;
                    case EtCommon.Comparison.COMP_GREATER: EventLeftAway = programmableCode;
                        event = onEventLeftAway;
                        sig = "leftaway"
                        break;
                }
                break;
            case Orientation.ORI_RIGHT:
                switch (comp) {
                    case EtCommon.Comparison.COMP_NORMAL: EventRightNormal = programmableCode;
                        event = onEventRightNormal;
                        sig = "rightnormal"
                        break;
                    case EtCommon.Comparison.COMP_LESS: EventRightClose = programmableCode;
                        event = onEventRightClose;
                        sig = "rightclose"
                        break;
                    case EtCommon.Comparison.COMP_GREATER: EventRightAway = programmableCode;
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
