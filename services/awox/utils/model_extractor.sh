#!/bin/bash
grep -Pioh 'PRODUCT_ID = {\K([^}]*)' * | sed -e 's/^//g' -e 's/$/,/g'