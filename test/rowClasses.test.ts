import { describe, expect, test } from "vitest";
import RowClassRulesBuilder from "../src/rowClasses.js";
import type {
  IRowClassRulesBuilder,
  componentType,
  IDataTable,
  IModelCard,
} from "../src/rowClasses.js";

describe("1. Тест выделение строк по условию (константа). Математические операции", () => {
  test("1.1 константа равна числу (не ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0 };
    const dataTable: IDataTable = { attr_N_: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: "eq",
            isKey: false,
            isXref: false,
            type: "constant",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("1.2 константа равна числу (ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0 };
    const dataTable: IDataTable = { attr_N_: 50, attr_N_id: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: "eq",
            isKey: false,
            isXref: true,
            type: "constant",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("1.3 константа Не равна числу (не ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0 };
    const dataTable: IDataTable = { attr_N_: 49, attr_N_id: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: 'neq',
            isKey: false,
            isXref: false,
            type: "constant",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("1.4 константа Не равна числу (ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0 };
    const dataTable: IDataTable = { attr_N_: 50, attr_N_id: 49 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: "neq",
            isKey: false,
            isXref: true,
            type: "constant",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
});
describe("2. Тест выделение строк по условию (поле из карточки). Математические операции", () => {
  test("2.1 поле из карточки равна числу (не ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { fieldAlias: 50, attr_N_id: 0 };
    const dataTable: IDataTable = { fieldAlias: 50, attr_N_id: 0 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "and",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "fieldAlias",
            attribute: "fieldAlias",
            equalsType: "eq",
            isKey: false,
            isXref: false,
            type: "field",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("2.2 поле из карточки равна числу (ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { fieldAlias: 0, attr_N_id: 50 };
    const dataTable: IDataTable = { fieldAlias: 0, attr_N_id: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "fieldAlias",
            equalsType: "eq",
            isKey: false,
            isXref: true,
            type: "field",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("2.3 поле из карточки Не равна числу (не ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 50, attr_N_id: 0 };
    const dataTable: IDataTable = { attr_N_: 50, attr_N_id: 0 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "49",
            equalsType: 'neq',
            isKey: false,
            isXref: false,
            type: "field",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("2.4 поле из карточки Не равна числу (ссылка)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0, attr_N_id: 50 };
    const dataTable: IDataTable = { attr_N_: 0, attr_N_id: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "49",
            equalsType: "neq",
            isKey: false,
            isXref: true,
            type: "field",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
});
describe("3. Тест выделение строк по НЕСКОЛЬКИМ условиям (константа). Математические операции", () => {
  test("3.1 константа равна числу (не ссылка) связь ИЛИ", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0 };
    const dataTable: IDataTable = { attr_N_: 50, attr_N1_: 49 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: 'or',
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: "eq",
            isKey: false,
            isXref: false,
            type: "constant",
          },
          {
            alias: "attr_N1_",
            attribute: "500",
            equalsType: "eq",
            isKey: false,
            isXref: false,
            type: "constant",
          },
        ],
      },
      
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("3.2 константа равна числу (ссылка) связь И", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 0 };
    const dataTable: IDataTable = { attr_N_: 50, attr_N1_: 49, attr_N_id: 50, attr_N1_id: 500 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "and",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: "eq",
            isKey: false,
            isXref: true,
            type: "constant",
          },
          {
            alias: "attr_N1_",
            attribute: "500",
            equalsType: "eq",
            isKey: false,
            isXref: true,
            type: "constant",
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
});
describe("4. Выделение строк ПУСТО/ Не ПУСТО", () => {
  test("4.1 ПУСТО", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 50 };
    const dataTable: IDataTable = { attr_N_: null };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "and",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "attr_N_",
            attribute: "50",
            equalsType: 'isNull',
            isKey: false,
            isXref: false,
            type: 'constant',
          },
        ],
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
})
