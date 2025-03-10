//% color="#EEAA00" icon="\uf140"
//% block="ET: Distance"
//% block.loc.nl="ET: Afstand"
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

    let DISTANCE = Distance.Normal

    let EventNormal: EtCommon.eventHandler
    let EventNear: EtCommon.eventHandler
    let EventAway: EtCommon.eventHandler

    export function onEventNormal(id: string, value: string) {
        if (EventNormal) EventNormal(id)
    }

    export function onEventNear(id: string, value: string) {
        if (EventNear) EventNear(id)
    }

    export function onEventAway(id: string, value: string) {
        if (EventAway) EventAway(id)
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
        EtCommon.events.unregister(MODULE)
        MODULE = id
        EtCommon.events.register(id, "normal", onEventNormal)
        EtCommon.events.register(id, "near", onEventNear)
        EtCommon.events.register(id, "away", onEventAway)
    }

    //% block="the distance to %id is %state"
    //% block.loc.nl="de afstand tot %id %state"
    //% id.defl="EtGate"
    export function askDistance(id: string, dist: Distance): boolean {
        return (DISTANCE == dist)
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
                EventNormal = programmableCode
                break
            case Distance.Near:
                EventNear = programmableCode
                break
            case Distance.Away:
                EventAway = programmableCode
                break
        }
    }

    EtCommon.events.register(MODULE, "normal", onEventNormal)
    EtCommon.events.register(MODULE, "near", onEventNear)
    EtCommon.events.register(MODULE, "away", onEventAway)

}
