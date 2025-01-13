//% color="#EEAA00" icon="\uf140"
//% block="ET: Distance"
//% block.loc.nl="ET: Distance"
namespace EtDistance {
    let MODULE = "EtDistance"

    export enum Orientation {
        //% block="left"
        //% block.loc.nl="links"
        Left,
        //% block="right"
        //% block.loc.nl="rechts"
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

    export function onEventFrontNormal(id: string, value: string) {
        if (EventFrontNormal) EventFrontNormal(id)
    }

    export function onEventFrontNear(id: string, value: string) {
        if (EventFrontNear) EventFrontNear(id)
    }

    export function onEventFrontAway(id: string, value: string) {
        if (EventFrontAway) EventFrontAway(id)
    }

    export function onEventLeftNormal(id: string, value: string) {
        if (EventLeftNormal) EventLeftNormal(id)
    }

    export function onEventLeftNear(id: string, value: string) {
        if (EventLeftNear) EventLeftNear(id)
    }

    export function onEventLeftAway(id: string, value: string) {
        if (EventLeftAway) EventLeftAway(id)
    }

    export function onEventRightNormal(id: string, value: string) {
        if (EventRightNormal) EventRightNormal(id)
    }

    export function onEventRightNear(id: string, value: string) {
        if (EventRightNear) EventRightNear(id)
    }

    export function onEventRightAway(id: string, value: string) {
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

    //% block="with %id is %near cm nearby and %away cm far away"
    //% block.loc.nl="bij %id is %near cm dichtbij en %away cm verweg"
    //% inlineInputMode=inline
    //% id.defl="EtDistance"
    //% near.min=20 near.max=300 near.defl=75
    //% away.min=20 away.max=300 away.defl=275
    export function setDistribution(id: string, near: number, away: number) {
        let val = near.toString() + "/" + away.toString()
        EtCommon.sendSignal(id, "distribution", val)
    }

    //% block="point %id %degr degrees to the %ori"
    //% block.loc.nl="richt %id %degr graden naar %ori"
    //% id.defl="EtDistance"
    //% degr.min=0 degr.max=45 degr.defl=45
    export function setAngle(id: string, degr: number, ori: Orientation) {
        if (ori == Orientation.Left)
            degr = -degr
        EtCommon.sendSignal(id, "angle", degr.toString())
    }

    //% block="point %id straight to the front"
    //% block.loc.nl="richt %id recht naar voren"
    //% id.defl="EtDistance"
    export function setFront(id: string) {
        EtCommon.sendSignal(id, "angle", "0")
    }

    //% block="when the distance to %id is %dist"
    //% block.loc.nl="wanneer de afstand tot %id %dist is"
    //% id.defl="EtDistance"
    export function onDistance(id: string, dist: Distance, programmableCode: () => void): void {
        switch (dist) {
            case Distance.Normal:
                EventFrontNormal = programmableCode
                EtCommon.events.register(MODULE, "normal", onEventFrontNormal)
                break
            case Distance.Near:
                EventFrontNear = programmableCode
                EtCommon.events.register(MODULE, "near", onEventFrontNear)
                break
            case Distance.Away:
                EventFrontAway = programmableCode
                EtCommon.events.register(MODULE, "away", onEventFrontAway)
                break
        }
    }
}
