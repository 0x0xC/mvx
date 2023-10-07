// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Game entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Game must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Game", id.toString(), this);
    }
  }

  static load(id: string): Game | null {
    return changetype<Game | null>(store.get("Game", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get houseEdge(): BigDecimal {
    let value = this.get("houseEdge");
    return value!.toBigDecimal();
  }

  set houseEdge(value: BigDecimal) {
    this.set("houseEdge", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }
}

export class Distribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Distribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Distribution must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Distribution", id.toString(), this);
    }
  }

  static load(id: string): Distribution | null {
    return changetype<Distribution | null>(store.get("Distribution", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get receiver(): string {
    let value = this.get("receiver");
    return value!.toString();
  }

  set receiver(value: string) {
    this.set("receiver", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get typeId(): BigInt {
    let value = this.get("typeId");
    return value!.toBigInt();
  }

  set typeId(value: BigInt) {
    this.set("typeId", Value.fromBigInt(value));
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class TokenStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TokenStat", id.toString(), this);
    }
  }

  static load(id: string): TokenStat | null {
    return changetype<TokenStat | null>(store.get("TokenStat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get volume(): BigDecimal {
    let value = this.get("volume");
    return value!.toBigDecimal();
  }

  set volume(value: BigDecimal) {
    this.set("volume", Value.fromBigDecimal(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get tokenSymbol(): string | null {
    let value = this.get("tokenSymbol");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenSymbol(value: string | null) {
    if (!value) {
      this.unset("tokenSymbol");
    } else {
      this.set("tokenSymbol", Value.fromString(<string>value));
    }
  }

  get tokenName(): string | null {
    let value = this.get("tokenName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenName(value: string | null) {
    if (!value) {
      this.unset("tokenName");
    } else {
      this.set("tokenName", Value.fromString(<string>value));
    }
  }

  get tokenDecimals(): BigInt | null {
    let value = this.get("tokenDecimals");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set tokenDecimals(value: BigInt | null) {
    if (!value) {
      this.unset("tokenDecimals");
    } else {
      this.set("tokenDecimals", Value.fromBigInt(<BigInt>value));
    }
  }

  get period(): string {
    let value = this.get("period");
    return value!.toString();
  }

  set period(value: string) {
    this.set("period", Value.fromString(value));
  }

  get periodIndex(): BigInt {
    let value = this.get("periodIndex");
    return value!.toBigInt();
  }

  set periodIndex(value: BigInt) {
    this.set("periodIndex", Value.fromBigInt(value));
  }
}

export class TokenGlobalStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TokenGlobalStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TokenGlobalStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TokenGlobalStat", id.toString(), this);
    }
  }

  static load(id: string): TokenGlobalStat | null {
    return changetype<TokenGlobalStat | null>(store.get("TokenGlobalStat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get volume(): BigDecimal {
    let value = this.get("volume");
    return value!.toBigDecimal();
  }

  set volume(value: BigDecimal) {
    this.set("volume", Value.fromBigDecimal(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get tokenSymbol(): string | null {
    let value = this.get("tokenSymbol");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenSymbol(value: string | null) {
    if (!value) {
      this.unset("tokenSymbol");
    } else {
      this.set("tokenSymbol", Value.fromString(<string>value));
    }
  }

  get tokenName(): string | null {
    let value = this.get("tokenName");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenName(value: string | null) {
    if (!value) {
      this.unset("tokenName");
    } else {
      this.set("tokenName", Value.fromString(<string>value));
    }
  }

  get tokenDecimals(): BigInt | null {
    let value = this.get("tokenDecimals");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set tokenDecimals(value: BigInt | null) {
    if (!value) {
      this.unset("tokenDecimals");
    } else {
      this.set("tokenDecimals", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class GameResult extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameResult entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type GameResult must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("GameResult", id.toString(), this);
    }
  }

  static load(id: string): GameResult | null {
    return changetype<GameResult | null>(store.get("GameResult", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get betTx(): Bytes | null {
    let value = this.get("betTx");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set betTx(value: Bytes | null) {
    if (!value) {
      this.unset("betTx");
    } else {
      this.set("betTx", Value.fromBytes(<Bytes>value));
    }
  }

  get resolveTx(): Bytes | null {
    let value = this.get("resolveTx");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set resolveTx(value: Bytes | null) {
    if (!value) {
      this.unset("resolveTx");
    } else {
      this.set("resolveTx", Value.fromBytes(<Bytes>value));
    }
  }

  get gameId(): BigInt | null {
    let value = this.get("gameId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set gameId(value: BigInt | null) {
    if (!value) {
      this.unset("gameId");
    } else {
      this.set("gameId", Value.fromBigInt(<BigInt>value));
    }
  }

  get gameType(): string | null {
    let value = this.get("gameType");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set gameType(value: string | null) {
    if (!value) {
      this.unset("gameType");
    } else {
      this.set("gameType", Value.fromString(<string>value));
    }
  }

  get referralId(): BigInt | null {
    let value = this.get("referralId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set referralId(value: BigInt | null) {
    if (!value) {
      this.unset("referralId");
    } else {
      this.set("referralId", Value.fromBigInt(<BigInt>value));
    }
  }

  get player(): Bytes | null {
    let value = this.get("player");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set player(value: Bytes | null) {
    if (!value) {
      this.unset("player");
    } else {
      this.set("player", Value.fromBytes(<Bytes>value));
    }
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }

  get win(): boolean {
    let value = this.get("win");
    return value!.toBoolean();
  }

  set win(value: boolean) {
    this.set("win", Value.fromBoolean(value));
  }

  get multiplier(): BigDecimal | null {
    let value = this.get("multiplier");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set multiplier(value: BigDecimal | null) {
    if (!value) {
      this.unset("multiplier");
    } else {
      this.set("multiplier", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get result(): BigInt | null {
    let value = this.get("result");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set result(value: BigInt | null) {
    if (!value) {
      this.unset("result");
    } else {
      this.set("result", Value.fromBigInt(<BigInt>value));
    }
  }

  get betOn(): Array<i32> | null {
    let value = this.get("betOn");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toI32Array();
    }
  }

  set betOn(value: Array<i32> | null) {
    if (!value) {
      this.unset("betOn");
    } else {
      this.set("betOn", Value.fromI32Array(<Array<i32>>value));
    }
  }

  get tokenSymbol(): string | null {
    let value = this.get("tokenSymbol");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenSymbol(value: string | null) {
    if (!value) {
      this.unset("tokenSymbol");
    } else {
      this.set("tokenSymbol", Value.fromString(<string>value));
    }
  }

  get betAsset(): Bytes | null {
    let value = this.get("betAsset");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set betAsset(value: Bytes | null) {
    if (!value) {
      this.unset("betAsset");
    } else {
      this.set("betAsset", Value.fromBytes(<Bytes>value));
    }
  }

  get fiatAmount(): BigDecimal | null {
    let value = this.get("fiatAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set fiatAmount(value: BigDecimal | null) {
    if (!value) {
      this.unset("fiatAmount");
    } else {
      this.set("fiatAmount", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get payoutFiatAmount(): BigDecimal | null {
    let value = this.get("payoutFiatAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set payoutFiatAmount(value: BigDecimal | null) {
    if (!value) {
      this.unset("payoutFiatAmount");
    } else {
      this.set("payoutFiatAmount", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get betAmount(): BigDecimal | null {
    let value = this.get("betAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set betAmount(value: BigDecimal | null) {
    if (!value) {
      this.unset("betAmount");
    } else {
      this.set("betAmount", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get payoutAmount(): BigDecimal | null {
    let value = this.get("payoutAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set payoutAmount(value: BigDecimal | null) {
    if (!value) {
      this.unset("payoutAmount");
    } else {
      this.set("payoutAmount", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get resolved(): boolean {
    let value = this.get("resolved");
    return value!.toBoolean();
  }

  set resolved(value: boolean) {
    this.set("resolved", Value.fromBoolean(value));
  }
}

export class PlayerStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PlayerStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PlayerStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PlayerStat", id.toString(), this);
    }
  }

  static load(id: string): PlayerStat | null {
    return changetype<PlayerStat | null>(store.get("PlayerStat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get wins(): i32 {
    let value = this.get("wins");
    return value!.toI32();
  }

  set wins(value: i32) {
    this.set("wins", Value.fromI32(value));
  }

  get losses(): i32 {
    let value = this.get("losses");
    return value!.toI32();
  }

  set losses(value: i32) {
    this.set("losses", Value.fromI32(value));
  }

  get profit(): BigDecimal {
    let value = this.get("profit");
    return value!.toBigDecimal();
  }

  set profit(value: BigDecimal) {
    this.set("profit", Value.fromBigDecimal(value));
  }

  get houseProfitnLoss(): BigDecimal {
    let value = this.get("houseProfitnLoss");
    return value!.toBigDecimal();
  }

  set houseProfitnLoss(value: BigDecimal) {
    this.set("houseProfitnLoss", Value.fromBigDecimal(value));
  }

  get period(): string {
    let value = this.get("period");
    return value!.toString();
  }

  set period(value: string) {
    this.set("period", Value.fromString(value));
  }

  get periodIndex(): BigInt {
    let value = this.get("periodIndex");
    return value!.toBigInt();
  }

  set periodIndex(value: BigInt) {
    this.set("periodIndex", Value.fromBigInt(value));
  }
}

export class PlayerGlobalStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PlayerGlobalStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PlayerGlobalStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PlayerGlobalStat", id.toString(), this);
    }
  }

  static load(id: string): PlayerGlobalStat | null {
    return changetype<PlayerGlobalStat | null>(
      store.get("PlayerGlobalStat", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get wins(): i32 {
    let value = this.get("wins");
    return value!.toI32();
  }

  set wins(value: i32) {
    this.set("wins", Value.fromI32(value));
  }

  get losses(): i32 {
    let value = this.get("losses");
    return value!.toI32();
  }

  set losses(value: i32) {
    this.set("losses", Value.fromI32(value));
  }

  get profit(): BigDecimal {
    let value = this.get("profit");
    return value!.toBigDecimal();
  }

  set profit(value: BigDecimal) {
    this.set("profit", Value.fromBigDecimal(value));
  }

  get houseProfitnLoss(): BigDecimal {
    let value = this.get("houseProfitnLoss");
    return value!.toBigDecimal();
  }

  set houseProfitnLoss(value: BigDecimal) {
    this.set("houseProfitnLoss", Value.fromBigDecimal(value));
  }
}

export class ReferralCode extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ReferralCode entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ReferralCode must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ReferralCode", id.toString(), this);
    }
  }

  static load(id: string): ReferralCode | null {
    return changetype<ReferralCode | null>(store.get("ReferralCode", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get code(): string {
    let value = this.get("code");
    return value!.toString();
  }

  set code(value: string) {
    this.set("code", Value.fromString(value));
  }
}

export class Code extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Code entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Code must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Code", id.toString(), this);
    }
  }

  static load(id: string): Code | null {
    return changetype<Code | null>(store.get("Code", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get codeId(): i32 {
    let value = this.get("codeId");
    return value!.toI32();
  }

  set codeId(value: i32) {
    this.set("codeId", Value.fromI32(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }
}

export class ReferralProfile extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ReferralProfile entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ReferralProfile must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ReferralProfile", id.toString(), this);
    }
  }

  static load(id: string): ReferralProfile | null {
    return changetype<ReferralProfile | null>(store.get("ReferralProfile", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get referrer(): string | null {
    let value = this.get("referrer");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set referrer(value: string | null) {
    if (!value) {
      this.unset("referrer");
    } else {
      this.set("referrer", Value.fromString(<string>value));
    }
  }

  get referrerCode(): string | null {
    let value = this.get("referrerCode");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set referrerCode(value: string | null) {
    if (!value) {
      this.unset("referrerCode");
    } else {
      this.set("referrerCode", Value.fromString(<string>value));
    }
  }

  get referredAt(): BigInt | null {
    let value = this.get("referredAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set referredAt(value: BigInt | null) {
    if (!value) {
      this.unset("referredAt");
    } else {
      this.set("referredAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get baseCommission(): BigInt | null {
    let value = this.get("baseCommission");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set baseCommission(value: BigInt | null) {
    if (!value) {
      this.unset("baseCommission");
    } else {
      this.set("baseCommission", Value.fromBigInt(<BigInt>value));
    }
  }

  get fiatVolume(): BigDecimal | null {
    let value = this.get("fiatVolume");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set fiatVolume(value: BigDecimal | null) {
    if (!value) {
      this.unset("fiatVolume");
    } else {
      this.set("fiatVolume", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get locked(): boolean {
    let value = this.get("locked");
    return value!.toBoolean();
  }

  set locked(value: boolean) {
    this.set("locked", Value.fromBoolean(value));
  }

  get first(): boolean {
    let value = this.get("first");
    return value!.toBoolean();
  }

  set first(value: boolean) {
    this.set("first", Value.fromBoolean(value));
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class ReferrerGlobalStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ReferrerGlobalStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ReferrerGlobalStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ReferrerGlobalStat", id.toString(), this);
    }
  }

  static load(id: string): ReferrerGlobalStat | null {
    return changetype<ReferrerGlobalStat | null>(
      store.get("ReferrerGlobalStat", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get houseProfitnLoss(): BigDecimal {
    let value = this.get("houseProfitnLoss");
    return value!.toBigDecimal();
  }

  set houseProfitnLoss(value: BigDecimal) {
    this.set("houseProfitnLoss", Value.fromBigDecimal(value));
  }

  get referees(): i32 {
    let value = this.get("referees");
    return value!.toI32();
  }

  set referees(value: i32) {
    this.set("referees", Value.fromI32(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }
}

export class ReferrerStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ReferrerStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ReferrerStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ReferrerStat", id.toString(), this);
    }
  }

  static load(id: string): ReferrerStat | null {
    return changetype<ReferrerStat | null>(store.get("ReferrerStat", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get houseProfitnLoss(): BigDecimal {
    let value = this.get("houseProfitnLoss");
    return value!.toBigDecimal();
  }

  set houseProfitnLoss(value: BigDecimal) {
    this.set("houseProfitnLoss", Value.fromBigDecimal(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get activeReferees(): i32 {
    let value = this.get("activeReferees");
    return value!.toI32();
  }

  set activeReferees(value: i32) {
    this.set("activeReferees", Value.fromI32(value));
  }

  get newReferees(): i32 {
    let value = this.get("newReferees");
    return value!.toI32();
  }

  set newReferees(value: i32) {
    this.set("newReferees", Value.fromI32(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get period(): string {
    let value = this.get("period");
    return value!.toString();
  }

  set period(value: string) {
    this.set("period", Value.fromString(value));
  }

  get periodIndex(): BigInt {
    let value = this.get("periodIndex");
    return value!.toBigInt();
  }

  set periodIndex(value: BigInt) {
    this.set("periodIndex", Value.fromBigInt(value));
  }
}

export class ReferralCodeGlobalStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save ReferralCodeGlobalStat entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ReferralCodeGlobalStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ReferralCodeGlobalStat", id.toString(), this);
    }
  }

  static load(id: string): ReferralCodeGlobalStat | null {
    return changetype<ReferralCodeGlobalStat | null>(
      store.get("ReferralCodeGlobalStat", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get referees(): i32 {
    let value = this.get("referees");
    return value!.toI32();
  }

  set referees(value: i32) {
    this.set("referees", Value.fromI32(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get houseProfitnLoss(): BigDecimal {
    let value = this.get("houseProfitnLoss");
    return value!.toBigDecimal();
  }

  set houseProfitnLoss(value: BigDecimal) {
    this.set("houseProfitnLoss", Value.fromBigDecimal(value));
  }

  get referralCode(): string {
    let value = this.get("referralCode");
    return value!.toString();
  }

  set referralCode(value: string) {
    this.set("referralCode", Value.fromString(value));
  }
}

export class ReferralCodeStat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ReferralCodeStat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ReferralCodeStat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ReferralCodeStat", id.toString(), this);
    }
  }

  static load(id: string): ReferralCodeStat | null {
    return changetype<ReferralCodeStat | null>(
      store.get("ReferralCodeStat", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get activeReferees(): i32 {
    let value = this.get("activeReferees");
    return value!.toI32();
  }

  set activeReferees(value: i32) {
    this.set("activeReferees", Value.fromI32(value));
  }

  get newReferees(): i32 {
    let value = this.get("newReferees");
    return value!.toI32();
  }

  set newReferees(value: i32) {
    this.set("newReferees", Value.fromI32(value));
  }

  get fiatVolume(): BigDecimal {
    let value = this.get("fiatVolume");
    return value!.toBigDecimal();
  }

  set fiatVolume(value: BigDecimal) {
    this.set("fiatVolume", Value.fromBigDecimal(value));
  }

  get betCount(): i32 {
    let value = this.get("betCount");
    return value!.toI32();
  }

  set betCount(value: i32) {
    this.set("betCount", Value.fromI32(value));
  }

  get houseProfitnLoss(): BigDecimal {
    let value = this.get("houseProfitnLoss");
    return value!.toBigDecimal();
  }

  set houseProfitnLoss(value: BigDecimal) {
    this.set("houseProfitnLoss", Value.fromBigDecimal(value));
  }

  get period(): string {
    let value = this.get("period");
    return value!.toString();
  }

  set period(value: string) {
    this.set("period", Value.fromString(value));
  }

  get periodIndex(): BigInt {
    let value = this.get("periodIndex");
    return value!.toBigInt();
  }

  set periodIndex(value: BigInt) {
    this.set("periodIndex", Value.fromBigInt(value));
  }

  get referralCode(): string {
    let value = this.get("referralCode");
    return value!.toString();
  }

  set referralCode(value: string) {
    this.set("referralCode", Value.fromString(value));
  }
}
