import { describe, expect, test } from "vitest";
import RowClassRulesBuilder from "../src/rowClasses.js";
import type {
  IRowClassRulesBuilder,
  componentType,
  IDataTable,
  IModelCard,
} from "../src/rowClasses.js";

describe("1. Тест выделение строк по условию (константа). Математические операции", () => {
  test("1.1 константа равна числу (50 = 50) (не ссылка)", () => {
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
  test("1.2 константа равна числу (50 = 50) (ссылка)", () => {
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
  test("1.3 константа Не равна числу (50 != 49) (не ссылка)", () => {
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
            equalsType: "neq",
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
  test("1.4 константа Не равна числу (50 != 49) (ссылка)", () => {
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
    const modelCard: IModelCard = { cardAttr: 50, attr_N_id: 0 };
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
            attribute: "cardAttr",
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
    const modelCard: IModelCard = { cardAttr: 50, attr_N_id: 0 };
    const dataTable: IDataTable = { attr_N_: 0, fieldAliasid: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "fieldAlias",
            attribute: "cardAttr",
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
    const modelCard: IModelCard = { cardAttr: 50, attr_N_id: 0 };
    const dataTable: IDataTable = { fieldAlias: 49, attr_N_id: 0 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "fieldAlias",
            attribute: "cardAttr",
            equalsType: "neq",
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
    const modelCard: IModelCard = { cardAttr: 49, attr_N_id: 0 };
    const dataTable: IDataTable = { attr_N_: 0, fieldAliasid: 50 };
    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1,
        operator: "or",
        className: "className",
        nameCondition: "conditionsName",
        dataFilter: [
          {
            alias: "fieldAlias",
            attribute: "cardAttr",
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
    const dataTable: IDataTable = {
      attr_N_: 50,
      attr_N1_: 49,
      attr_N_id: 50,
      attr_N1_id: 500,
    };
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
  test("4.1 ПУСТО (null)", () => {
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
            equalsType: "is_null",
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
  test("4.1 ПУСТО ('')", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 50 };
    const dataTable: IDataTable = { attr_N_: "" };
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
            equalsType: "is_null",
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
  test("4.1.1 ПУСТО ('[]') включена галка оптимизировать загрузку. ссылка в таблице", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1],
    };
    const dataTable: IDataTable = { attr_88_: "[]" };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1674815536951,
        operator: "and",
        className: "green",
        dataFilter: [
          {
            type: "constant",
            alias: "attr_88_",
            isKey: false,
            isXref: true,
            attribute: "attr_123_",
            equalsType: "is_null",
          },
        ],
        nameCondition: "green",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("4.2 Не ПУСТО (0)", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 50 };
    const dataTable: IDataTable = { attr_N_: 0 };
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
            equalsType: "is_not_null",
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
  test("4.2 Не ПУСТО ('0')", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = { attr_N_: 50 };
    const dataTable: IDataTable = { attr_N_: "0" };
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
            equalsType: "is_not_null",
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
});
describe("5. Множественная ссылка", () => {
  test("5.1 ссылка в таблице IN (Равен любому) значение мн. ссылки в карточке", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1],
    };
    const dataTable: IDataTable = {
      attr_88_: '[{"id": 1, "name": "Респ. Бурятия"}]',
      attr_88_id: [1],
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1674815536951,
        operator: "and",
        className: "green",
        dataFilter: [
          {
            type: "field",
            alias: "attr_88_",
            isKey: false,
            isXref: true,
            attribute: "attr_123_",
            equalsType: "in",
          },
        ],
        nameCondition: "green",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("5.2 ссылка в таблице NOT_IN (Не равен любому) значение мн. ссылки в карточке", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1],
    };
    const dataTable: IDataTable = {
      attr_88_: '[{"id": 4, "name": "Респ. Колмыкия"}]',
      attr_88_id: [4],
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1674815536951,
        operator: "and",
        className: "green",
        dataFilter: [
          {
            type: "field",
            alias: "attr_88_",
            isKey: false,
            isXref: true,
            attribute: "attr_123_",
            equalsType: "not_in",
          },
        ],
        nameCondition: "green",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("5.3 ссылка в таблице equals_all (Все равны) значение мн. ссылки в карточке", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1, 4],
    };
    const dataTable: IDataTable = {
      attr_88_: '[{"id": 4, "name": "Респ. Колмыкия"}]',
      attr_88_id: [4, 3, 1],
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1674815536951,
        operator: "and",
        className: "green",
        dataFilter: [
          {
            type: "field",
            alias: "attr_88_",
            isKey: false,
            isXref: true,
            attribute: "attr_123_",
            equalsType: "equals_all",
          },
        ],
        nameCondition: "green",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("5.4 ссылка в таблице not_equals_all (Все не равны) значение мн. ссылки в карточке", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1, 4],
    };
    const dataTable: IDataTable = {
      attr_88_: '[{"id": 4, "name": "Респ. Колмыкия"}]',
      attr_88_id: [4, 3, 2],
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1674815536951,
        operator: "and",
        className: "green",
        dataFilter: [
          {
            type: "field",
            alias: "attr_88_",
            isKey: false,
            isXref: true,
            attribute: "attr_123_",
            equalsType: "not_equals_all",
          },
        ],
        nameCondition: "green",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
});
describe("6. Текст / строка", () => {
  test("6.1 Текст содержит (cs). Таблица содержит слово константу", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1, 4],
    };
    const dataTable: IDataTable = {
      alias: "_EDIT_196_DEL_196_VIEW_196_ACT_2_ADD_2_EDIT_2_текстович",
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1697011846722,
        operator: "and",
        className: "grey",
        dataFilter: [
          {
            type: "constant",
            alias: "alias",
            isKey: false,
            isXref: false,
            attribute: "текстович",
            equalsType: "cs",
          },
        ],
        nameCondition: "Название условия",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("6.2 Текст содержит (cs). Таблица содержит слово из текстового поля", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      asd: 'текстович имя_4',
    };
    const dataTable: IDataTable = {
      alias: "текстович",
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1697011846722,
        operator: "and",
        className: "grey",
        dataFilter: [
          {
            type: "field",
            alias: "alias",
            isKey: false,
            isXref: false,
            attribute: "asd",
            equalsType: "cs",
          },
        ],
        nameCondition: "Название условия",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("6.3 Текст не содержит (ncs). Таблица содержит слово константу", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      attr_123_: [3, 1, 4],
    };
    const dataTable: IDataTable = {
      alias: "текстоич",
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1697011846722,
        operator: "and",
        className: "grey",
        dataFilter: [
          {
            type: "constant",
            alias: "alias",
            isKey: false,
            isXref: false,
            attribute: "текстович",
            equalsType: "ncs",
          },
        ],
        nameCondition: "Название условия",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
  test("6.4 Текст не содержит (ncs). Таблица содержит слово из текстового поля", () => {
    const componentType: componentType = "list";
    // если констаната modelCard - не учавствует в рассчете
    const modelCard: IModelCard = {
      asd: 'текстоичаа текстовч',
    };
    const dataTable: IDataTable = {
      alias: "текстович",
    };

    const rules: IRowClassRulesBuilder[] = [
      {
        id: 1697011846722,
        operator: "and",
        className: "grey",
        dataFilter: [
          {
            type: "field",
            alias: "alias",
            isKey: false,
            isXref: false,
            attribute: "asd",
            equalsType: "ncs",
          },
        ],
        nameCondition: "Название условия",
      },
    ];

    expect(
      RowClassRulesBuilder.build({ rules, modelCard, componentType, dataTable })
    ).toHaveProperty(rules[0].className, true);
  });
});
