package com.turbolife.projetoturbo.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.turbolife.projetoturbo.api.entities.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long>{

}
