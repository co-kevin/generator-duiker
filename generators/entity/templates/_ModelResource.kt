package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.web.rest

import com.baomidou.mybatisplus.plugins.Page
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.service.<%= entityClass %>Service
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

import javax.validation.Valid

/**
 * Rest controller. <%= entityClass %>
 */
@RestController
@RequestMapping("/api")
class <%= entityClass %>Resource(private val service: <%= entityClass %>Service) {

    private final val log = LoggerFactory.getLogger(javaClass)

    /**
     * Get /<%= tableName %> : Create a new <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to create
     * @return the ResponseEntity with status 200 (OK) and with body the new <%= entityClassCamelCase %>
     */
    @PostMapping("/<%= tableName %>")
    fun create<%= entityClass %>(@Valid @RequestBody <%= entityClassCamelCase %>: <%= entityClass %> ): ResponseEntity<<%= entityClass %>> {
        log.debug("REST request to save <%= entityClass %> : {}", <%= entityClassCamelCase %>)
        service.insert(<%= entityClassCamelCase %>)
        return ResponseEntity.ok(<%= entityClassCamelCase %>)
    }

    /**
     * PUT /<%= tableName %> : Updates an existing <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated <%= tableName %>
     */
    @PutMapping("/<%= tableName %>")
    fun update<%= entityClass %>(@Valid @RequestBody <%= entityClassCamelCase %>: <%= entityClass %>): ResponseEntity<<%= entityClass %>> {
        log.debug("REST request to update <%= entityClass %> : {}", <%= entityClassCamelCase %>)
        service.updateById(<%= entityClassCamelCase %>)
        return ResponseEntity.ok(<%= entityClassCamelCase %>)
    }

    /**
     * GET /<%= tableName %> : get all <%= tableName %>.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all <%= tableName %>
     */
    @SuppressWarnings("unchecked")
    @GetMapping("/<%= tableName %>")
    @ApiOperation(value = "get all <%= tableName %>.", response = Page::class)
    fun getAll<%= entityClass %>(@ApiParam pageable: Page<<%= entityClass %>>): ResponseEntity<Page<<%= entityClass %>>> {
        val Page<<%= entityClass %>> page = service.selectPage(pageable)
        return ResponseEntity.ok(page)
    }

    /**
     * GET /<%= tableName %>/info : get the "id" <%= tableName %>
     *
     * @param id the id of the <%= tableName %> to find
     * @return
     */
    @GetMapping("/<%= tableName %>/info")
    @ApiOperation(value = "get the \"id\" <%= tableName %>", response = <%= entityClass %>.class)
    fun get<%= entityClass %>(@RequestParam id: Int?): ResponseEntity<<%= entityClass %>> {
        log.debug("REST request to get <%= entityClass %> : {}", id)
        <%= entityClass %> entity = service.selectById(id)
        return ResponseEntity.ok(entity)
    }

    /**
     * DELETE /<%= tableName %> : delete the "id" <%= tableName %>.
     *
     * @param id the id of the <%= tableName %> to delete
     * @return
     */
    @DeleteMapping("/<%= tableName %>")
    fun delete<%= entityClass %>(@RequestParam id: Int?) {
        log.debug("REST request to delete <%= entityClass %> : {}", id)
        service.deleteById(id)
    }
}
