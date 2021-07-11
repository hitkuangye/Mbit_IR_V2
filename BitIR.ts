

//% weight=10 color=#008B00 icon="\uf1eb" block="Mbit_IR_V2"
namespace BitIR {
    


    let irstate:number;
    let state:number;
    
    export enum enIRButton {

        //% blockId="Up" block="Up"
        Up = 0x18,
        //% blockId="Light" block="Star"
        Light = 0x68,
        //% blockId="Left" block="Left"
        Left = 0x10,
        //% blockId="Beep" block="Pound"
        Beep = 0xB0,
        //% blockId="Right" block="Right"
        Right = 0x5a,
        //% blockId="SpinLeft" block="Ok"
        SpinLeft = 0x38,
        //% blockId="Down" block="Down"
        Down = 0x4a,
        //% blockId="Zero" block="Zero"
        Zero = 0x98,
        //% blockId="One" block="One"
        One = 0xa2,
        //% blockId="Two" block="Two"
        Two = 0x62,
        //% blockId="Three" block="Three"
        Three = 0xe2,
        //% blockId="Four" block="Four"
        Four = 0x22,
        //% blockId="Five" block="Five"
        Five = 0x02,
        //% blockId="Six" block="Six"
        Six = 0xc2,
        //% blockId="Seven" block="Seven"
        Seven = 0xe0,
        //% blockId="Eight" block="Eight"
        Eight = 0xa8,
        //% blockId="Nine" block="Nine"
        Nine = 0x90,

    }



     /**
     * Read IR sensor value V2.
     */

    //% advanced=true shim=Bit_IR::irCode
    function irCode(): number {
        return 0;
    }

    //% weight=5
    //% blockId=IR_KeyValue block="IR_KeyValue|value %value"
    export function IR_KeyValue(value: enIRButton): number {
        return value;
    }

    
    //% weight=5
    //% blockId=IR_readV2 block="read IR key value"
    export function IR_readV2(): number {
        return valuotokeyConversion();
    }

    //% weight=2
    //% blockId=IR_callbackUserV2 block="on IR received"
    //% draggableParameters
    export function IR_callbackUserV2(cb: (message: number) => void) {
        state = 1;
        control.onEvent(11, 22, function() {
            cb(irstate);
        }) 
    }

    function valuotokeyConversion():number{
        let irdata:number;
        switch(irCode()){
            case 0xff00:irdata = 0;break;
            case 0xfe01:irdata = 1;break;
            case 0xfd02:irdata = 2;break;
            case 0xfb04:irdata = 4;break;
            case 0xfa05:irdata = 5;break;
            case 0xf906:irdata = 6;break;
            case 0xf708:irdata = 8;break;
            case 0xf609:irdata = 9;break;
            case 0xf50a:irdata = 10;break;
            case 0xf30c:irdata = 12;break;
            case 0xf20d:irdata = 13;break;
            case 0xf10e:irdata = 14;break;
            case 0xef10:irdata = 16;break;
            case 0xee11:irdata = 17;break;
            case 0xed12:irdata = 18;break;
            case 0xeb14:irdata = 20;break;
            case 0xea15:irdata = 21;break;
            case 0xe916:irdata = 22;break;
            case 0xe718:irdata = 24;break;
            case 0xe619:irdata = 25;break;
            case 0xe51a:irdata = 26;break;
            default:
             irdata = -1;
        }
        return irdata;
    }

    basic.forever(() => {
        if(state == 1){
            irstate = valuotokeyConversion();
            if(irstate != -1){
                control.raiseEvent(11, 22);
            }
        }
        
        basic.pause(20);
    })

}
