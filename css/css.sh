#!/bin/bash

static=$(cd $(dirname $0) && pwd)
css=$static
build=$static

MERGED_CSS=$build/all.merged.css
echo "" > $MERGED_CSS

pushd $css/core
for f in `awk -F'"' '/import/ {print $2}' ./core.css`; do
	cat $f >> $MERGED_CSS
	echo -e '\n' >> $MERGED_CSS
done
popd

pushd $css/plugins
for f in `awk -F'"' '/import/ {print $2}' ./plugins.css`; do
	cat $f >> $MERGED_CSS
	echo -e '\n' >> $MERGED_CSS
done
popd
