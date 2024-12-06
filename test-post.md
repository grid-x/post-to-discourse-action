## GET /systems/{systemID}/gateways/{gatewayID}/import-power-limit

- :warning: removed the optional property '/allOf[subschema #1: Import power
  limit]/maxImportTotal' from the response with the '200' status
- added the optional property '/allOf[subschema #1: Import power
  limit]/maxImportTotalFoo' to the response with the '200' status
- the 'maxImportL2' response's property default value changed from '0.00' to
  '42.00' for the status '200'

## PUT /systems/{systemID}/gateways/{gatewayID}/import-power-limit

- :warning: removed the request property '/allOf[subschema #1: Import power
  limit]/maxImportTotal'
- :warning: removed the optional property '/allOf[subschema #1: Import power
  limit]/maxImportTotal' from the response with the '201' status
- added the new optional request property '/allOf[subschema #1: Import power
  limit]/maxImportTotalFoo'
- the 'maxImportL2' request property default value changed from '0.00' to
  '42.00'
- added the optional property '/allOf[subschema #1: Import power
  limit]/maxImportTotalFoo' to the response with the '201' status
- the 'maxImportL2' response's property default value changed from '0.00' to
  '42.00' for the status '201'

## GET /systems/{systemID}/tags

- :warning: removed the optional property '/items/allOf[subschema #2]/createdAt'
  from the response with the '200' status
- added the optional property
  '/items/allOf[#/components/schemas/AbstractTag]/foo' to the response with the
  '200' status

## PATCH /systems/{systemID}/tags

- :warning: removed the optional property '/items/allOf[subschema #2]/createdAt'
  from the response with the '200' status
- added the new optional request property
  '/items/allOf[#/components/schemas/AbstractTag]/foo'
- added the optional property
  '/items/allOf[#/components/schemas/AbstractTag]/foo' to the response with the
  '200' status

## PUT /systems/{systemID}/tags

- :warning: removed the optional property '/items/allOf[subschema #2]/createdAt'
  from the response with the '200' status
- added the new optional request property
  '/items/allOf[#/components/schemas/AbstractTag]/foo'
- added the optional property
  '/items/allOf[#/components/schemas/AbstractTag]/foo' to the response with the
  '200' status

## PUT /systems/{systemID}/tags/{tagName}

- :warning: removed the optional property '/allOf[subschema #2]/createdAt' from
  the response with the '200' status
- :warning: removed the optional property '/allOf[subschema #2]/createdAt' from
  the response with the '201' status
- added the optional property '/allOf[#/components/schemas/AbstractTag]/foo' to
  the response with the '200' status
- added the optional property '/allOf[#/components/schemas/AbstractTag]/foo' to
  the response with the '201' status
