//positionObjectsOnMatrix
//
//Description: Distribute an array of objects on an XZ matrix defined by two points in space.
//
//Parameters
//	startPosition: 		A point in space where the matrix begins. Must be a THREE.Vector3
//	endPosition: 		A point in space where the matrix ends. Must be a THREE.Vector3
//	yPosition:			The matrix Y position. It can be an Integer or Float value
//	objectsList:		The objects array to be distributed. Must be an array []
//	objectsListGroup:	Internally this method treats the distributed objects as a single object. Must be a THREE.Object3D

function positionObjectsOnMatrix(startPosition, endPosition, yPosition, objectsList, objectsListGroup) {

    //Calculate Matrix
    var matrix = calculateMatrix(objectsList.length, startPosition, endPosition);
    var objectIndex = 0;

    //Clear existing itens
    for (var i = objectsListGroup.children.length - 1; i >= 0; i--) {
        objectsListGroup.remove(objectsListGroup.children[i]);
    }

    //Change object's positions according to the calculated matrix
    for (var row = 1; row <= matrix.numberOfColumnsAndRows; row++) {
        for (var column = 1; column <= matrix.numberOfColumnsAndRows; column++) {

            if (objectIndex < objectsList.length) {
                var xPosition = ((matrix.cellWidth * column) - (matrix.cellWidth / 2)) + startPosition.x;
                var zPosition = (matrix.cellHeight * row) - (matrix.cellHeight / 2) + startPosition.z;
                objectsList[objectIndex].position.set(xPosition, yPosition, zPosition);

                objectsListGroup.add(objectsList[objectIndex]);

                objectIndex++;
            }
        }
    }

    //Add objects on scene
    scene.add(objectsListGroup);
}
//____________________________________________________________________________________________________________


//calculateMatrix
//
//Description: Creates an object with 3 parameters that defines a square matrix. This parameters are:
//		cellWidth: 				The cell's width of the calculated matrix
//		cellHeight: 			The cell's height of the calculated matrix
//		numberOfColumnsAndRows: The resulting number of columns and rows
//*This method is used by positionObjectsOnMatrix method
//
//Parameters
//	numberOfObjects: The quantity of objects to be distributed in the matrix. Must be an Integer
//	startPosition: 		A point in space where the matrix begins. Must be a THREE.Vector3
//	endPosition: 		A point in space where the matrix ends. Must be a THREE.Vector3
//
function calculateMatrix(numberOfObjects, startPosition, endPosition) {

    var matrixWidth = endPosition.x - startPosition.x;
    var matrixHeight = endPosition.z - startPosition.z;
    var cellWidth, cellHeight;
    var divisionFactor = Math.ceil(Math.sqrt(numberOfObjects));

    cellWidth = matrixWidth / divisionFactor;
    cellHeight = matrixHeight / divisionFactor;

    return { cellWidth: cellWidth, cellHeight: cellHeight, numberOfColumnsAndRows: divisionFactor };
}
//____________________________________________________________________________________________________________


//convertPercentage
//
//Description: Returns a number that percentually represents the corresponding value from scale 1 to scale 2
//
//Parameters
//	scale1Value: 	Value to be converted to another scale (scale 2)
//	scale1Min: 		Minimum scale 1 value
//	scale1Max: 		Maximum scale 1 value
//	scale2Min: 		Minimum scale 2 value
//	scale2Max: 		Maximum scale 2 value
//
function convertPercentage(scale1Value, scale1Min, scale1Max, scale2Min, scale2Max){
    var scale1Difference = scale1Max - scale1Min;
    var scale2Difference = scale2Max - scale2Min;

    return (((scale1Value - scale1Min) * scale2Difference) / scale1Difference) + scale2Min;
}
//____________________________________________________________________________________________________________