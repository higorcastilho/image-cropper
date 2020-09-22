export default function(Photo) {
	// Selection Tool
	Photo.selection = document.getElementById('selection-tool')

	Photo.startSelection = false

	const events = {
		mouseover(){
			this.style.cursor = 'crosshair'
		},
		mousedown(){
			const { clientX, clientY, offsetX, offsetY } = event
			/*console.table({
				'client': [clientX, clientY],
				'offset': [offsetX, offsetY]
			})*/
			Photo.startX = clientX
			Photo.startY = clientY
			Photo.relativeStartX = offsetX
			Photo.relativeStartY = offsetY

			Photo.startSelection = true
		},
		mousemove(){
			Photo.endX = event.clientX
			Photo.endY = event.clientY

			if(Photo.startSelection) {
				Photo.selection.style.display = 'initial'
				Photo.selection.style.top = Photo.startY + 'px'
				Photo.selection.style.left = Photo.startX + 'px'

				Photo.selection.style.width = (Photo.endX - Photo.startX) + 'px'
				Photo.selection.style.height = (Photo.endY - Photo.startY) + 'px'
			}

		},
		mouseup(){
			Photo.startSelection = false

			Photo.relativeEndX = event.layerX
			Photo.relativeEndY = event.layerY

			//mostrar o botãode corte
			Photo.cropButton.style.display = 'initial'
		}
	}

	Object.keys(events)
	.forEach(eventName => {
		Photo.photoPreview.addEventListener(eventName, events[eventName])
	})
}