import { assert, expect, test } from 'vitest'
import { RowClassRulesBuilder } from '../src/rowClasses.js'


RowClassRulesBuilder.build({
  rules: this.rowClassRules,
  modelCard,
  componentType: 'list',
  dataTable: record
})