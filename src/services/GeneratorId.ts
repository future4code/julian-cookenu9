import {v4} from "uuid"

export class GeneratorId {
    public generate (): string{
        return v4()
    }
}