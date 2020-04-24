var node = {
    // Position of the node
    id: 'node1',
    offsetX: 100,
    offsetY: 50,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>s</p>"
    }],
    // Text(label) added to the node
};

var node1 = {
    // Position of the node
    id: 'node2',
    offsetX: 100,
    offsetY: 110,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>e</p>"
    }],
    // Text(label) added to the node
};

var node2 = {
    // Position of the node
    id: 'node3',
    offsetX: 100,
    offsetY: 170,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>s</p>"
    }],
    // Text(label) added to the node
};

var node3 = {
    // Position of the node
    id: 'node4',
    offsetX: 100,
    offsetY: 230,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>e</p>"
    }],
    // Text(label) added to the node
};

var node4 = {
    // Position of the node
    id: 'node5',
    offsetX: 100,
    offsetY: 290,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>s</p>"
    }],
    // Text(label) added to the node
};

var node5 = {
    // Position of the node
    id: 'node6',
    offsetX: 100,
    offsetY: 350,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>e</p>"
    }],
    // Text(label) added to the node
};

var node6 = {
    // Position of the node of the node
    id: 'node7',
    offsetX: 100,
    offsetY: 410,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>s</p>"
    }],
    // Text(label) added to the node
};

var node7 = {
    // Position of the node of the node
    id: 'node8',
    offsetX: 100,
    offsetY: 470,
    // Size of the node
    width: 100,
    height: 50,
     style: { fill: '#6BA5D7', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 1, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        template: "<p class='input'>e</p>"
    }],
    // Text(label) added to the node
};

var box = {
    // Position of the node
    id: 'box1',
    offsetX: 550,
    offsetY: 50,
    // Size of the node
    width: 500,
    height: 50,
     style: { fill: 'beige', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 0, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        content: 'Yeah'
    }],
    // Text(label) added to the node
};

var box1 = {
    // Position of the node of the node
    id: 'box2',
    offsetX: 550,
    offsetY: 170,
    // Size of the node
    width: 500,
    height: 50,
     style: { fill: 'beige', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 0, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        content: 'Go'
    }],
    // Text(label) added to the node
};
var box3 = {
    // Position of the node of the node
    id: 'box3',
    offsetX: 550,
    offsetY: 290,
    // Size of the node
    width: 500,
    height: 50,
     style: { fill: 'beige', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 0, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        content: "And you take the fame! I'm under and over it all I'm under and over it!"
    }],
    // Text(label) added to the node
};

var box4 = {
    // Position of the node of the node
    id: 'box4',
    offsetX: 550,
    offsetY: 410,
    // Size of the node
    width: 500,
    height: 50,
     style: { fill: 'beige', strokeColor: 'white' },
     ports: [{ id: 'port1', offset : { x: 0, y: 0.5  }, visibility: ej.diagrams.PortVisibility.Visible }],
     annotations: [{
        
        content: "Did you hear the one about me, giving a shit? Cause if I ever did, I don't remember it!"
    }],
    // Text(label) added to the node
};

var portX = 0;
var portY = 0;
var sourceNodeId = '';
var tartgetNodeId = '';
var sourcePortId = '';
var targetPortId = '';

// initialize Diagram component

var diagram = new ej.diagrams.Diagram({
    width: '100%', height: '600px',
    nodes: [node, node1, node2, node3, node4, node5, node6, node7, box, box1, box3, box4],

    click: function (args){
        if(firstClick){
            if(args.element.properties.id.startsWith('node')){
                sourcePortId = args.element.properties.ports[0].id;
                sourceNodeId = args.element.properties.id;
                firstClick = false;
                console.log('source\n' + new Ac4yJSONHandler().serialized(args.element));   
            }
        }
        if(!firstClick){
            if(args.element.properties.id.startsWith('box')){
                targetPortId = args.element.properties.ports[0].id;
                targetNodeId = args.element.properties.id;
                firstClick = true;
                addConnectorToDiagram(sourceNodeId, sourcePortId, targetNodeId, targetPortId);
                console.log(new Ac4yJSONHandler().serialized(args.element));   
            }
        }

        if(args.element.properties.id.startsWith('connector')){
            console.log(new Ac4yJSONHandler().serialized(args.element));            
        }
    }
}, '#element');

    var id = 0;
    var firstClick = true;

function createConnector(id, sourceNodeId, sourcePortId, targetNodeId, targetPortId) {
    return {
        id: "connector" + id,
        style: {
           strokeColor: '#6BA5D7',
           fill: '#6BA5D7',
           strokeWidth: 2
       },
       targetDecorator: {
           style: {
               fill: '#6BA5D7',
               strokeColor: '#6BA5D7'
           }
       },
       sourceID: sourceNodeId,
       sourcePortID: sourcePortId,
       targetID: targetNodeId,
       targetPortID: targetPortId
    };
}

function addConnectorToDiagram(sourceNodeId, sourcePortId, targetNodeId, targetPortId) {
    var newConnector = createConnector(id, sourceNodeId, sourcePortId, targetNodeId, targetPortId);
    id++;
    diagram.add(newConnector);
}
