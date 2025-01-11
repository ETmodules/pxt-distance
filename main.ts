//% color="#EEAA00" icon="\uf140"
//% block="ET: Distance"
//% block.loc.nl="ET: Distance"
namespace EtDistance {
    let MODULE = "EtDistance"

    export enum SetOrientation {
        //% block="left"
        //% block.loc.nl="links"
        Left,
        //% block="right"
        //% block.loc.nl="rechts"
        Right
    }

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

    export enum SetDistance {
        //% block="nearby"
        //% block.loc.nl="dichtbij"
        Near,
        //% block="far away"
        //% block.loc.nl="verweg"
        Away
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

    //% block="with %id %name %ori is %dist cm"
    //% block.loc.nl="bij %id is %name %ori %dist cm"
    //% inlineInputMode=inline
    //% id.defl="EtDistance"
    //% dist.min=20 dist.max=300 dist.defl=50
    export function setDistance(id: string, name: SetDistance, ori: Orientation, dist: number) {
        let signal: string
        switch (ori) {
            case Orientation.Front: signal = "front"; break;
            case Orientation.Left: signal = "left"; break;
            case Orientation.Right: signal = "right"; break;
        }
        switch (name) {
            case SetDistance.Near: signal += "near"; break;
            case SetDistance.Away: signal += "away"; break;
        }
        EtCommon.setValue(id, signal, dist.toString())
    }

    //% block="with %id turns %ori %degr degrees"
    //% block.loc.nl="bij %id draait %ori %degr graden"
    //% id.defl="EtDistance"
    //% degr.min=0 degr.max=45 degr.defl=45
    export function setAngle(id: string, ori: SetOrientation, degr: number) {
        let signal: string
        switch (ori) {
            case SetOrientation.Left: signal = "leftangle"; break;
            case SetOrientation.Right: signal = "rightangle"; break;
        }
        EtCommon.setValue(id, signal, degr.toString())
    }

    //% block="the distance in cm %ori to %id"
    //% block.loc.nl="de afstand in cm %ori tot %id"
    //% id.defl="EtDistance"
    export function askDistance(ori: Orientation, id: string) : number {
        let signal: string
        switch (ori) {
            case Orientation.Front: signal = "front"; break;
            case Orientation.Left: signal = "left"; break;
            case Orientation.Right: signal = "right"; break;
        }
        EtCommon.askValue(id, signal)
        let ret: string
        do {
            ret = EtCommon.getValue(MODULE, "A", signal)
        }
        while (ret.isEmpty())
        return parseFloat( ret)
    }

    //% block="when the distance %ori to %id is %dist"
    //% block.loc.nl="wanneer de afstand %ori tot %id %dist is"
    //% id.defl="EtDistance"
    export function onDistance(ori: Orientation, id: string, dist: Distance, programmableCode: () => void): void {
        switch (ori) {
            case Orientation.Front:
                switch (dist) {
                    case Distance.Normal:
                        EventFrontNormal = programmableCode
                        EtCommon.events.register(MODULE, "front", "normal", onEventFrontNormal)
                        break
                    case Distance.Near:
                        EventFrontNear = programmableCode
                        EtCommon.events.register(MODULE, "front", "near", onEventFrontNear)
                        break
                    case Distance.Away:
                        EventFrontAway = programmableCode
                        EtCommon.events.register(MODULE, "front", "away", onEventFrontAway)
                        break
                }
                break
            case Orientation.Left:
                switch (dist) {
                    case Distance.Normal:
                        EventLeftNormal = programmableCode
                        EtCommon.events.register(MODULE, "left", "normal", onEventLeftNormal)
                        break
                    case Distance.Near:
                        EventLeftNear = programmableCode
                        EtCommon.events.register(MODULE, "left", "near", onEventLeftNear)
                        break
                    case Distance.Away:
                        EventLeftAway = programmableCode
                        EtCommon.events.register(MODULE, "left", "away", onEventLeftAway)
                        break
                }
                break
            case Orientation.Right:
                switch (dist) {
                    case Distance.Normal:
                        EventRightNormal = programmableCode
                        EtCommon.events.register(MODULE, "right", "normal", onEventRightNormal)
                        break
                    case Distance.Near:
                        EventRightNear = programmableCode
                        EtCommon.events.register(MODULE, "right", "near", onEventRightNear)
                        break
                    case Distance.Away:
                        EventRightAway = programmableCode
                        EtCommon.events.register(MODULE, "right", "away", onEventRightAway)
                        break
                }
                break
        }
    }
}
