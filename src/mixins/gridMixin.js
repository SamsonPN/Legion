export default {
    methods: {
        coordinatesInGrid(coordInfo){
            let {row, cell, coordinates} = coordInfo;
            return coordinates.filter(coord => {
                let {x, y} = coord;
                x += cell;
                y += row;
                return this.isWithinGrid(x, y);
            });
        },
        isWithinGrid(x, y){
            return y >= 0 && y < 20 && x >= 0 && x < 22;
        },
        spliceArchetypeFromList(archetypeList, archetype){
            let index = archetypeList.indexOf(archetype);
            if(index !== -1){
                archetypeList.splice(index, 1)
            }
            return archetypeList;
        },
        computeArchetypeList(charInfo){
            let {archetype, cell, append} = charInfo;
            let archetypeList = cell.getAttribute('archetypeList');
            archetypeList = append ? archetypeList.concat(`,${archetype}`) : archetypeList;
            archetypeList = archetypeList.split(",").filter(el => el.length !== 0);
            return archetypeList;
        },
        computeArchetype(archetypeInfo){
            let {archetype, archetypeList, append, cell} = archetypeInfo;
            archetypeList = append ? archetypeList : this.spliceArchetypeFromList(archetypeList, archetype);
            cell.setAttribute('archetypeList', archetypeList);
            let newArchetype;
            if(archetypeList.length === 0){
                newArchetype = "";
            }
            else if(archetypeList.length === 1){
                newArchetype = archetypeList[0];
            }
            else if(archetypeList.length > 1){
                newArchetype = "Overlap";
            }
            return newArchetype;
        },
        setArchetypes(charInfo){
            let {archetype, coordinates, position, append} = charInfo;
            let {rowIndex, cellIndex} = position;
            let legionrow = [...document.getElementsByClassName('LegionRow')];
            let coordsInGrid = this.coordinatesInGrid({ row: rowIndex, cell: cellIndex, coordinates });
            coordsInGrid.forEach(coord => {
                let {x, y} = coord;
                x += cellIndex;
                y += rowIndex;
                let cell = legionrow[y].children[x];
                let archetypeList = this.computeArchetypeList({archetype, cell, append});
                let newArchetype = this.computeArchetype({archetypeList, archetype, append, cell});
                cell.setAttribute('archetype', newArchetype);
            })
        },
        resetGridArchetypes(){
            let legioncell = [...document.getElementsByClassName('LegionCell')];
            legioncell.forEach(cell => {
                cell.setAttribute('archetypeList', "");
                cell.removeAttribute('archetype');
            })
        },
    }
}