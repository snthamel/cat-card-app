/**
 * @swagger
 *  /:
 *    get:
 *      summary: Creates a new greeting card
 *      parameters:
 *        - in: query
 *          name: greeting
 *          description: Greeting
 *          required: false
 *          schema:
 *            type: string
 *        - in: query
 *          name: who
 *          description: Name
 *          required: false
 *          schema:
 *            type: string
 *        - in: query
 *          name: width
 *          description: Width
 *          required: false
 *          schema:
 *            type: integer
 *            format: int32
 *        - in: query
 *          name: height
 *          description: Height
 *          required: false
 *          schema:
 *            type: integer
 *            format: int32
 *        - in: query
 *          name: color
 *          description: Text color
 *          required: false
 *          schema:
 *            type: string
 *        - in: query
 *          name: size
 *          description: Size
 *          required: false
 *          schema:
 *            type: integer
 *            format: int32
 *      responses:
 *        200:
 *          description: Returns a success message with created image data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      url:
 *                        type: string
 *              example:
 *                message: Cat card created with text "Hello World"
 *                data:
 *                  name: 1620759330488.jpg
 *                  url: http://localhost:3000/1620759330488.jpg
 *        422:
 *          description: Unprocessable Entity
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              example:
 *                message: Internal Server Error
 * 
 * @swagger
 *  /{filename}:
 *    get:
 *      summary: Downloads image specified by filename
 *      parameters:
 *        - in: path
 *          name: filename
 *          schema:
 *            type: string
 *          required: true
 *          description: Name with extension of the file to download
 *      responses:
 *        200:
 *          description: Downloads a binary image file
 *          content:
 *            image/png:
 *              schema:
 *                type: file
 *            image/jpg:
 *              schema:
 *                type: file
 *            image/jpeg:
 *              schema:
 *                type: file
 *        404:
 *          description: File does not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              example:
 *                message: Image not found
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *              example:
 *                message: Internal Server Error
 */